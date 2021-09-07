process.stdin.setEncoding('utf-8');

let args: string[] = [];

process.stdin.on('data', function (inputStdin: string): void {
  args.push(inputStdin.trim());
  if (args.length == 3) {
    main(args);
    args = [];
  }
});

function main(value: string[]) {
  console.log(`> ${value.join(',')}`);
}

export {};
