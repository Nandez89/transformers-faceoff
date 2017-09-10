'use strict';

describe('Transformers App Tests', function() {

  describe('Battle Controller', function() {
    var $scope, TransformerDecoratorFactory, BattleRulesService;

    beforeEach(module('TransformersApp'));

    beforeEach(inject(function($rootScope, $controller, _TransformerDecoratorFactory_, _BattleRulesService_) {
      $scope = $rootScope.$new();
      TransformerDecoratorFactory =_TransformerDecoratorFactory_;
      BattleRulesService = _BattleRulesService_;
      $controller('BattleController', {
        $scope: $scope
      });
      
      spyOn(TransformerDecoratorFactory, 'decorateTransformer').and.callThrough();  
      spyOn(BattleRulesService, 'resolveFaceOff').and.returnValue(999);  
    }));
    
    it('should return true if both teams have fighters left', function(){
      $scope.autobots = [1];
      $scope.decepticons = [1];
      
      expect($scope.checkBothTeamsHaveFighters()).toBeTruthy();
    });
    
    it('should return false if the autobots dont have fighters left', function(){
      $scope.autobots = [];
      $scope.decepticons = [1];
      
      expect($scope.checkBothTeamsHaveFighters()).toBeFalsy();
    });
    
    it('should return false if the decepticons dont have fighters left', function(){
      $scope.autobots = [1];
      $scope.decepticons = [];
      
      expect($scope.checkBothTeamsHaveFighters()).toBeFalsy();
    });

    describe('Reset Arena', function() {

      it('should reset the information for the battle: Empty arrays, strings, and set scores to 0', function() {
        $scope.resetArena();

        expect($scope.battleLineup).toEqual([]);
        expect($scope.autobots).toEqual([]);
        expect($scope.winnerBots).toEqual([]);
        expect($scope.decepticons).toEqual([]);
        expect($scope.remainingBots).toEqual([]);
        expect($scope.amountOfBattles).toEqual(0);
        expect($scope.autobotVictories).toEqual(0);
        expect($scope.decepticonVictories).toEqual(0);
        expect($scope.loosingTeam).toEqual("");
      });
    });

    describe('Increase Team Points', function() {
      var winner = {};

      beforeEach(function() {
        $scope.resetArena();
      });

      it('should increase autobotVictories', function() {
        winner = {
          team: "A"
        };

        $scope.increaseTeamPoints(winner);

        expect($scope.autobotVictories).toEqual(1);
      });

      it('should increase decepticonVictories', function() {
        winner = {
          team: "D"
        };

        $scope.increaseTeamPoints(winner);

        expect($scope.decepticonVictories).toEqual(1);
      });

    });

    describe('Set Last Winner', function() {

      it('should set last winner for the winning team', function() {
        var winners = [{
          name: "testBot",
          team: "A"
        }];

        $scope.setLastWinner(winners, "D");

        expect($scope.lastWinner.name).toEqual("testBot");
      });

      it('should ignore winners from the losing team and set last winner for the winning team', function() {
        var winners = [{
          name: "testBot",
          team: "A"
        }, {
          name: "testBot2",
          team: "D"
        }];

        $scope.setLastWinner(winners, "D");

        expect($scope.lastWinner.name).toEqual("testBot");
      });
    });

    describe('Set Remaning Bots', function() {

      beforeEach(function() {
        $scope.autobots = 'autobots';
        $scope.decepticons = 'decepticons';
      });
      
      it('should set the autobots', function() {
        $scope.loosingTeam = "A";
        $scope.setRemainingBots();

        expect($scope.remainingBots).toEqual("autobots");
      });

      it('should set the decepticons', function() {
        $scope.loosingTeam = "D";
        $scope.setRemainingBots();

        expect($scope.remainingBots).toEqual("decepticons");
      });
    });
    
    describe('Set Loosing Team', function() {
      
      it('should set the autobots', function() {
        $scope.autobotVictories = 0;
        $scope.decepticonVictories = 1;
        
        $scope.setLoosingTeam();

        expect($scope.loosingTeam).toEqual("A");
      });
      
      it('should set the decepticons', function() {
        $scope.autobotVictories = 1;
        $scope.decepticonVictories = 0;
        
        $scope.setLoosingTeam();

        expect($scope.loosingTeam).toEqual("D");
      });
      
      it('should set to TIED', function() {
        $scope.autobotVictories = 1;
        $scope.decepticonVictories = 1;
        
        $scope.setLoosingTeam();

        expect($scope.loosingTeam).toEqual("TIED");
      });

    });
    
    describe('Resolve Battles', function(){
      
      beforeEach(function() {
        $scope.transformersInput = ["Soundwave, D, 8,9,2,6,7,5,6,10", "Bluestreak, A, 6,6,7,9,5,2,9,7"];
        
        spyOn($scope, 'resetArena').and.callThrough();
      });
      
      it('should call the decorator to parse the string input', function(){
        $scope.resolveBattles();
        expect(TransformerDecoratorFactory.decorateTransformer).toHaveBeenCalled();
      });
      
      it('should call the battle service if each team has more than 1 transformer', function(){
        $scope.resolveBattles();
        expect(BattleRulesService.resolveFaceOff).toHaveBeenCalled();
      });
      
      it('should not call the battle service if any team has no transformers left', function(){
        $scope.transformersInput = ["Soundwave, D, 8,9,2,6,7,5,6,10"];

        $scope.resolveBattles();
        expect(BattleRulesService.resolveFaceOff).not.toHaveBeenCalled();
      });
      
      it('should add transformers to battleLineup', function(){

        $scope.resolveBattles();
        expect($scope.battleLineup.length).toEqual(2);
      });
      
      it('should count the amount of battles', function(){

        $scope.resolveBattles();
        expect($scope.amountOfBattles).toEqual(1);
      }); 
      
      it('should set the last winner as the mock return value for resolveFaceOff', function(){

        $scope.resolveBattles();
        expect($scope.lastWinner).toEqual(999);
      });
      
      it('should call handle exceptions when an an exception is caused', function(){
        spyOn($scope, 'handleErrorException');

        $scope.transformersInput = ["Soundwave, D"];
        $scope.resolveBattles();
        expect($scope.handleErrorException).toHaveBeenCalled();
        
        $scope.transformersInput = ["Soundwave, D, 8,9,2,R,RR,5,6,10"];
        $scope.resolveBattles();
        expect($scope.handleErrorException).toHaveBeenCalled();
      });
      
    
    });
  });
});