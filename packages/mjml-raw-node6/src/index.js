import { BodyComponent } from 'mjml-core-node6'

export default class MjRaw extends BodyComponent {
  static componentName = 'mj-raw'

  static endingTag = true

  static rawElement = true

  render() {
    return this.getContent()
  }
}
