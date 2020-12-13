import { AnyType, AnySemiType, SemiTypeOf, TypeOf } from '../Type';
import { InterfaceSemiType } from './Interface';
import { OutputObjectSemiType } from './OutputObject';

export type ListTypeOf<SB extends AnySemiType> = Array<SemiTypeOf<SB>>;

// TODO: can we do recursive output objects?

export interface TypeMap<B extends AnyType> {
  [key: string]: {
    brick: B;
  };
}

export interface ArgumentConfig {
  brick: AnyInputType;
  description?: string;
  deprecationReason?: string;
  // defaultValue?: any; // TODO: implement
}
export interface OutputFieldArgumentMap {
  [key: string]: ArgumentConfig;
}

export type OutputKind =
  | 'scalar'
  | 'enum'
  | 'union'
  | 'outputobject'
  | 'interface'
  | 'outputlist';

export type AnyOutputType = AnyType<OutputKind>;
export type AnyOutputSemiType = AnySemiType<OutputKind>;

export type TMap<M extends TypeMap<any>> = {
  [K in keyof M]: TypeOf<M[K]['brick']>;
};

export type AnyOutputObjectSemiType = OutputObjectSemiType<any, any>;

// We need this to guarantee uniqueness of registered interfaces
export interface InterfaceSemiTypeMap {
  [key: string]: InterfaceSemiType<any, any, any>;
}

export interface InputFieldConfig {
  brick: AnyInputType;
  description?: string;
  deprecationReason?: string;
  // defaultValue?: any; // TODO: implement
}

export interface InputFieldConfigMap extends TypeMap<AnyInputType> {
  [key: string]: InputFieldConfig;
}

export type InputKind = 'scalar' | 'enum' | 'inputlist' | 'inputobject';
export type AnyInputType = AnyType<InputKind>;
export type AnyInputSemiType = AnySemiType<InputKind>;
