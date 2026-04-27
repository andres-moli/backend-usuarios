import NodeCache from 'node-cache';
import { ICacheService } from '../../application/interfaces/ICacheService';

export class MemoryCacheService implements ICacheService {
  private cache: NodeCache;
  
  constructor(ttlSeconds: number = 300) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
    });
  }
  
  async get<T>(key: string): Promise<T | null> {
    const value = this.cache.get<T>(key);
    return value || null;
  }
  
  async set<T>(key: string, value: T, ttl: number = 300): Promise<void> {
    this.cache.set(key, value, ttl);
  }
  
  async del(key: string): Promise<void> {
    this.cache.del(key);
  }
  
  async clear(): Promise<void> {
    this.cache.flushAll();
  }
  
  async delPattern(pattern: string): Promise<void> {
    const keys = this.cache.keys();
    const regex = new RegExp(pattern.replace('*', '.*'));
    const matchingKeys = keys.filter(key => regex.test(key));
    
    if (matchingKeys.length > 0) {
      this.cache.del(matchingKeys);
    }
  }
}