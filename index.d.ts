export interface Schema {
  [column: string]: string;
}

export class HDB {
  constructor(path?: string);
  open(): Promise<this>;
  close(): Promise<void>;
  query<T = Record<string, unknown>>(cypher: string, params?: Record<string, unknown>): Promise<T[]>;
  exec(cypher: string, params?: Record<string, unknown>): Promise<void>;
  createNodeTable(name: string, schema: Schema): Promise<void>;
  createRelTable(name: string, from: string, to: string, schema?: Schema): Promise<void>;
  createNode(table: string, data: Record<string, unknown>): Promise<void>;
  createEdge(
    relTable: string,
    fromTable: string,
    fromKey: string,
    fromVal: unknown,
    toTable: string,
    toKey: string,
    toVal: unknown,
    props?: Record<string, unknown>
  ): Promise<void>;
  createVectorIndex(table: string, indexName: string, column: string, metric?: 'cosine' | 'l2' | 'ip'): Promise<void>;
  vectorSearch(table: string, indexName: string, vector: number[], k?: number): Promise<Array<{ node: Record<string, unknown>; distance: number }>>;
  vectorSearchWithTraversal<T = Record<string, unknown>>(
    table: string,
    indexName: string,
    vector: number[],
    k: number,
    cypher: string
  ): Promise<T[]>;
  getNodes<T = Record<string, unknown>>(table: string, where?: Record<string, unknown>): Promise<T[]>;
  getRelated<T = Record<string, unknown>>(
    table: string,
    key: string,
    value: unknown,
    relTable: string,
    direction?: 'in' | 'out'
  ): Promise<T[]>;
}

export function createHDB(path?: string): Promise<HDB>;
