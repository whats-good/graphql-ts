import { GraphQLList } from 'graphql';
import {
  Brick,
  NonNullableBrickOf,
  NullableBrickOf,
  SemiBrick,
} from '../Brick';
import { SemiBrickFactory } from '../SemiBrickFactory';
import { AnyInputSemiBrick } from './InputObject';
import { ListTypeOf } from './struct-types';

// TODO: combine the input and output lists into one super class, and then specialize.
export class InputListSemiBrick<SB extends AnyInputSemiBrick> extends SemiBrick<
  'inputlist',
  GraphQLList<any>,
  ListTypeOf<SB>
> {
  public readonly kind = 'inputlist';
  public readonly listOf: SB;
  public readonly nonNullable: NonNullableBrickOf<InputListSemiBrick<SB>>;
  public readonly nullable: NullableBrickOf<InputListSemiBrick<SB>>;

  constructor(params: {
    semiBrickFactory: SemiBrickFactory;
    name: string;
    listOf: SB;
  }) {
    super(params);
    this.listOf = params.listOf;
    this.nonNullable = Brick.initNonNullable(this);
    this.nullable = Brick.initNullable(this);
  }

  public readonly getFreshSemiGraphQLType = (): GraphQLList<any> => {
    return new GraphQLList(this.listOf.getSemiGraphQLType());
  };
}
