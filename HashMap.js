export default class HashMap {
  #capacity = 16;
  #buckets = Array.from({ length: this.#capacity }, () => []);
  #loadFactor = 0.75;
  #length = 0;

  set(key, value) {
    const hashCode = this.#hash(key);

    const bucket = this.#buckets[hashCode];

    const index = bucket.findIndex((node) => node.key === key);

    if (index === -1) {
      bucket.push({ key, value });
      this.#length++;
    } else {
      bucket[index].value = value;
    }

    if (this.#isExceedLoad()) this.#growBuckets();
  }
  
  get(key) {
    const hashCode = this.#hash(key);

    const bucket = this.#buckets[hashCode];

    return bucket.find((node) => node.key === key)?.value ?? null;
  }
  
  has(key) {
    const hashCode = this.#hash(key);

    const bucket = this.#buckets[hashCode];

    return bucket.some((node) => node.key === key);
  }

  remove(key) {
    const hashCode = this.#hash(key);

    const bucket = this.#buckets[hashCode];

    const index = bucket.findIndex((node) => node.key === key);

    if (index !== -1) {
      bucket.splice(index, 1);
      this.#length--;
      return true;
    }

    return false;
  }
  
  length() {
    return this.#length;
  }
  
  clear() {
    this.#buckets.forEach((bucket) => {
      bucket.length = 0;
    });

    this.#length = 0;
  }
  
  keys() {
    return this.#buckets.reduce((result, bucket) => {
      bucket.forEach((node) => result.push(node.key));

      return result;
    }, []);
  }
  
  values() {
    return this.#buckets.reduce((result, bucket) => {
      bucket.forEach((node) => result.push(node.value));

      return result;
    }, []);
  }
  
  entries() {
    return this.#buckets.reduce((result, bucket) => {
      bucket.forEach((node) => result.push([node.key, node.value]));

      return result;
    }, []);
  }
  
  #hash(key) {
    let hashCode = 0;
  
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }
  
    return hashCode;
  }

  #growBuckets() {
    this.#capacity *= 2;

    const prevBuckets = this.#buckets;

    this.#buckets = Array.from({ length: this.#capacity }, () => []);
    this.#length = 0;

    prevBuckets.forEach((bucket) => {
      bucket.forEach(({ key, value }) => this.set(key, value));
    });
  }

  #isExceedLoad() {
    return this.#length > this.#capacity * this.#loadFactor;
  }
}
