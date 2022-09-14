const ctx: Worker = self as any;

ctx.onmessage = (event) => {
  if (!event) return;

  let dataSource = event.data[0];
  let isSorted = event.data[1];

  if (isSorted) {
    dataSource.sort((a, b) => a.id - b.id);
  } else {
    dataSource.sort((a, b) => b.id - a.id);
  }

  postMessage(dataSource);
};
