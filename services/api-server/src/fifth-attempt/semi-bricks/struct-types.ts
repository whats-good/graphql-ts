import { AnyBrick, AnySemiBrick, SemiTypeOf, TypeOf } from '../Brick';
import { AnyInputBrick } from './InputObject';
import { InterfaceSemiBrick } from './Interface';
import { OutputObjectSemiBrick } from './OutputObject';

export type ListTypeOf<SB extends AnySemiBrick> = Array<SemiTypeOf<SB>>;

// TODO: can we do recursive output objects?

export interface BrickMap<B extends AnyBrick> {
  [key: string]: {
    brick: B;
  };
}

export interface ArgumentConfig {
  brick: AnyInputBrick;
  description?: string;
  deprecationReason?: string;
  // defaultValue?: any; // TODO: implement
}
export interface OutputFieldConfigArgumentMap extends BrickMap<AnyInputBrick> {
  [key: string]: ArgumentConfig;
}

type OutputKind =
  | 'scalar'
  | 'enum'
  | 'union'
  | 'outputobject'
  | 'interface'
  | 'outputlist';

export type AnyOutputBrick = AnyBrick<OutputKind>;
export type AnyOutputSemiBrick = AnySemiBrick<OutputKind>;

// TODO: add context stuff later
export interface OutputFieldConfig<
  B extends AnyOutputBrick,
  A extends OutputFieldConfigArgumentMap
> {
  readonly brick: B;
  readonly args: A;
  readonly description?: string;
  readonly deprecationReason?: string;
  resolve?: unknown;
  // TODO: consider refining this
}

export interface OutputFieldConfigMap extends BrickMap<AnyOutputBrick> {
  [key: string]: OutputFieldConfig<
    AnyOutputBrick,
    OutputFieldConfigArgumentMap
  >;
}

export type TMap<M extends BrickMap<any>> = {
  [K in keyof M]: TypeOf<M[K]['brick']>;
};

export type AnyOutputObjectSemiBrick = OutputObjectSemiBrick<any>;

// We need this to guarantee uniqueness of registered interfaces
export interface InterfaceSemiBrickMap {
  [key: string]: InterfaceSemiBrick<any>;
}