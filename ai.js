const net = new brain.NeuralNetwork();

function a(){

  net.train([{
      input: [],
      output: [0]
    },
    {
      input: [],
      output: [1]
    },
    // {
    //   input: [1, 0, 5, 2, 3, 8, 0],
    //   output: [1]
    // },
    // {
    //   input: [1, 1],
    //   output: [0]
    // }
  ]);

  const output = net.run([1,3,9,5]); // [0.987]

  console.log(output)
}

