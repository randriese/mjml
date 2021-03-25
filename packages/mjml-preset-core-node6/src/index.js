import { Social, SocialElement } from 'mjml-social-node6'
import { Navbar, NavbarLink } from 'mjml-navbar-node6'
import { Carousel, CarouselImage } from 'mjml-carousel-node6'
import {
  Accordion,
  AccordionElement,
  AccordionText,
  AccordionTitle,
} from 'mjml-accordion-node6'
import Body from 'mjml-body-node6'
import Head from 'mjml-head-node6'
import HeadAttributes from 'mjml-head-attributes-node6'
import HeadBreakpoint from 'mjml-head-breakpoint-node6'
import HeadHtmlAttributes from 'mjml-head-html-attributes-node6'
import HeadFont from 'mjml-head-font-node6'
import HeadPreview from 'mjml-head-preview-node6'
import HeadStyle from 'mjml-head-style-node6'
import HeadTitle from 'mjml-head-title-node6'
import Hero from 'mjml-hero-node6'
import Button from 'mjml-button-node6'
import Column from 'mjml-column-node6'
import Divider from 'mjml-divider-node6'
import Group from 'mjml-group-node6'
import Image from 'mjml-image-node6'
import Raw from 'mjml-raw-node6'
import Section from 'mjml-section-node6'
import Spacer from 'mjml-spacer-node6'
import Text from 'mjml-text-node6'
import Table from 'mjml-table-node6'
import Wrapper from 'mjml-wrapper-node6'
import dependencies from './dependencies'

const components = [
  Body,
  Head,
  HeadAttributes,
  HeadBreakpoint,
  HeadHtmlAttributes,
  HeadFont,
  HeadPreview,
  HeadStyle,
  HeadTitle,
  Hero,
  Button,
  Column,
  Divider,
  Group,
  Image,

  Raw,
  Section,
  Spacer,
  Text,
  Table,
  Wrapper,

  Social,
  SocialElement,
  Navbar,
  NavbarLink,
  Accordion,
  AccordionElement,
  AccordionText,
  AccordionTitle,
  Carousel,
  CarouselImage,
]

const presetCore = {
  components,
  dependencies,
}

export default presetCore
