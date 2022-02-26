let wadieExample = [];
let dahamExamples = [];
let zeghamriExamples = [];
let watermarkClassifier;

function preload() {
   for (let i = 0; i < 100; i++) {
      wadieExample[i] = loadImage(`../example_generator/sketch_220224a/data/wadiemendja${i}.png`);
      dahamExamples[i] = loadImage(`../example_generator/sketch_220224a/data/dahama${i}.png`);
      zeghamriExamples[i] = loadImage(`../example_generator/sketch_220224a/data/zeghamris${i}.png`);
   }
}

function setup() {
   watermarkClassifier = ml5.neuralNetwork({
      inputs: [64, 64, 4],
      task: "imageClassification",
      debug: true
   });
   for (let i = 0; i < wadieExample.length; i++) {
      watermarkClassifier.addData({ image: wadieExample[i] }, { label: "Wadie Mendja" });
      watermarkClassifier.addData({ image: dahamExamples[i] }, { label: "Daham A" });
      watermarkClassifier.addData({ image: zeghamriExamples[i] }, { label: "Zeghamri Salah" });
   }
   watermarkClassifier.normalizeData();
   watermarkClassifier.train({ epochs: 50 }, () => console.log("Finished training"));
}