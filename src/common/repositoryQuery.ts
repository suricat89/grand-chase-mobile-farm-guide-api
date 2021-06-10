import {FieldPath, WhereFilterOp} from '@google-cloud/firestore';

export default class RepositoryQuery {
  field: string | FieldPath;
  operator: WhereFilterOp;
  value: unknown;

  constructor(
    field: string | FieldPath,
    operator: WhereFilterOp,
    value: unknown
  ) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }
}
