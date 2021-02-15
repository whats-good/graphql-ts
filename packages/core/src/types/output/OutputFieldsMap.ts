import { GraphQLFieldConfigMap } from 'graphql';
import { AnySchemaBuilder } from '../../SchemaBuilder';
import {
  mapValues,
  StringKeys,
  Thunkable,
  unthunk,
  Unthunked,
} from '../../utils';
import { ExternalTypeOf, OutputRealizedType } from '../core';
import { ArgsMap } from '../input/ArgsMap';
import { OutputFieldConstructorParams, toOutputField } from './OutputField';

export type OutputFieldsMapValue<
  R extends OutputRealizedType,
  M extends ArgsMap
> = R | OutputFieldConstructorParams<R, M>;

export type TypeInOutputMapValue<
  V extends OutputFieldsMapValue<OutputRealizedType, ArgsMap>
> = V extends OutputRealizedType
  ? V
  : V extends OutputFieldConstructorParams<OutputRealizedType, ArgsMap>
  ? V['type']
  : never;

export type ArgsMapInOutputMapValue<
  V extends OutputFieldsMapValue<OutputRealizedType, ArgsMap>
> = V extends ArgsMap
  ? V
  : V extends OutputFieldConstructorParams<OutputRealizedType, ArgsMap>
  ? V['args']
  : never;

type OutputFieldConstructorParamsInOutputMapValue<
  V extends OutputFieldsMapValue<OutputRealizedType, ArgsMap>
> = OutputFieldConstructorParams<
  TypeInOutputMapValue<V>,
  ArgsMapInOutputMapValue<V>
>;

export type OutputFieldsMap = StringKeys<
  Thunkable<OutputFieldsMapValue<OutputRealizedType, ArgsMap>>
>;

export const toGraphQLFieldConfigMap = (params: {
  fields: OutputFieldsMap;
  schemaBuilder: AnySchemaBuilder;
  objectName?: string;
}): GraphQLFieldConfigMap<any, any> => {
  return mapValues(params.fields, (protoField, fieldName) => {
    const unthunkedProtoField = unthunk(protoField);
    const field = toOutputField(unthunkedProtoField);
    return field.getGraphQLFieldConfig({
      fieldName,
      schemaBuilder: params.schemaBuilder,
      objectName: params.objectName,
    });
  });
};

export type ObfuscatedOutputFieldsMap<M extends OutputFieldsMap> = {
  [K in keyof M]:
    | M[K]
    | Thunkable<
        | TypeInOutputMapValue<Unthunked<M[K]>>
        | OutputFieldConstructorParamsInOutputMapValue<Unthunked<M[K]>>
      >;
};

export type TypeOfOutputFieldsMap<M extends OutputFieldsMap> = {
  [K in keyof M]: ExternalTypeOf<TypeInOutputMapValue<Unthunked<M[K]>>>;
};
