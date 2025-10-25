import LinkedList from "./LinkedList";

export default class HashMap {
  #capacity = 16;
  #buckets = Array.from({ length: this.#capacity }, () => null);
  #loadFactor = 0.75;
  #length = 0;

  set(key, value) {
    const hashcode = this.#hash(key);
  }
  
  get(key) {
    
  }
  
  has(key) {

  }

  remove(key) {

  }
  
  length() {
    
  }
  
  clear() {
    
  }
  
  keys() {
    
  }
  
  values() {
    
  }
  
  entries() {
    
  }
  
  #hash(key) {
    let hashCode = 0;
  
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }
  
    return hashCode;
  }
}