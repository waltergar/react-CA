import React from 'react'

import Section, { Row, Col } from 'components/Core/Section/Section'
import Textbox from 'components/Core/Textbox/Textbox'

import mail from 'assets/images/homepage/mail.svg'
import user from 'assets/images/homepage/user.svg'
import pencil from 'assets/images/homepage/pencil.svg'
import phone from 'assets/images/homepage/phone.svg'
import styles from './Contact.scss'


const Contact = () => (
  <Section className={styles.Contact} background='#818d9d' rounded>
    <Row>
      <Col md='8'>
        <h1>Contact Us</h1>
        <p>
          We’d love to hear from you and will respond as soon as possible. <br />
          We appreciate you taking the time to contact us!
        </p>
      </Col>
    </Row>
    <Row>
      <Col md='8'>
        <form>
          <Textbox
            placeholder='Your name - optional'
            icon={user}
            isTransparent
          />
          <Textbox
            placeholder='Phone - optional'
            icon={phone}
            isTransparent
          />
          <Textbox
            placeholder='Enter your email...'
            icon={mail}
            isTransparent
          />
          <Textbox
            placeholder='Message'
            icon={pencil}
            isTransparent
            textarea
          />
        </form>
      </Col>
    </Row>
  </Section>
)

export default Contact
