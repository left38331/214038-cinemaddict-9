export default class ModelComment {
  constructor(data) {
    this.text = data[`comment`];
    this.emotion = data[`emotion`];
    this.author = data[`author`];
    this.id = data[`id`];
    this.date = data[`date`];
  }

  static parseComment(data) {
    return new ModelComment(data);
  }

  static parseComments(data) {
    return data.map(ModelComment.parseComment);
  }
}
