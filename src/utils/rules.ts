export default class Rules {
  static required (value: Array<any> | string = ''): boolean {
    return (Array.isArray(value) && value.length > 0) || (typeof value === 'string' && !!value) || (typeof value === 'boolean' && value === true) || (typeof value === 'object' && !Array.isArray(value) && value !== null) || (typeof value === 'number' && !isNaN(value));
  }

  static email (value = ''): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  }
}
