/*
declare schema types of common data types that are not default to mongoose
*/
const intSchemaTypes = {
  type:Number,
  required:true,
  set: value=>Math.round(value)
};

module.exports = [intSchemaTypes];