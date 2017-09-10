var app = angular.module('TransformersApp');

app.factory("TransformerDecoratorFactory", function() {

  function decorateTransformer(transformerString) {
    var valueArray = transformerString.split(',');
    var transformer = {};

    transformer.name = valueArray[0];
    transformer.team = valueArray[1].trim();

    transformer.strength = Number(valueArray[2]);
    transformer.intelligence = Number(valueArray[3]);
    transformer.speed = Number(valueArray[4]);
    transformer.endurance = Number(valueArray[5]);
    transformer.rank = Number(valueArray[6]);
    transformer.courage = Number(valueArray[7]);
    transformer.firePower = Number(valueArray[8]);
    transformer.skill = Number(valueArray[9]);

    transformer.overallRating = transformer.strength + transformer.intelligence +
      transformer.speed + transformer.endurance +
      transformer.firePower;
    return transformer;
  }

  return {
    decorateTransformer: decorateTransformer,
  };
});