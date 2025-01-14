import { HeadComponent } from 'mjml-core-node6'

export default class MjFont extends HeadComponent {
  static componentName = 'mj-font'

  static tagOmission = true

  static allowedAttributes = {
    name: 'string',
    href: 'string',
  }

  handler() {
    const { add } = this.context

    add('fonts', this.getAttribute('name'), this.getAttribute('href'))
  }
}
