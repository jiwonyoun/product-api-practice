export function HandleError() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);

    const method = descriptor.value;

    descriptor.value = function () {
      try {
        console.log('decorator run');
        method();
      } catch (e) {
        console.log(e);
      }
    };
  };
}
