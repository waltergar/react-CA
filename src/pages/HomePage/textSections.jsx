import React from 'react'
import Aux from 'components/Hoc/Aux/Aux'
import styles from './HomePage.scss'


const textSections = {
  whyCreditAcademy: {
    title: 'Credit Academy Prepaid Mastercard Program',
    content: (
      <Aux>
        <p>
          The Credit Academy Prepaid Mastercard® Program is designed with teens in mind,
            from using a prepaid Mastercard to simulate a real credit card, to using
            chores to teach teens the value of hard work to pay for the things they buy
            using their Credit Academy Mastercard®.
        </p>
        <p>
          Credit Academy Prepaid Reloadable Mastercard® is one of the tools we use that
            help us complement the credit experience to teach teens how to use credit wisely.
        </p>
        <p>
          Credit Academy moves beyond allowance money to design a virtual prepaid Mastercard
            that simulates the credit card experience to educate teens about credit cards.
        </p>
      </Aux>
    ),
  },
  aboutUs: {
    title: 'About Us',
    content: (
      <Aux>
        <p>
          Once upon a time, a young couple had horrible credit. They lasted years bringing up
            their credit score but once they did, endless financial opportunities opened. During
            those years, they had a child. “We are teaching our child how to save but, how do we
            teach him the importance of using credit wisely?” dad wondered. “we should simulate
            the experience of owning a credit card” said mom. “a real credit experience without
            the risk of bad credit” said dad. “The kids can pay their balance by doing chores and
            we should use emojis as ‘credit scores’” said mom. Eureka! Credit Academy was born.
        </p>
      </Aux>
    ),
  },
  ourMission: {
    title: 'Our Mission',
    content: (
      <h2 className={styles.ourMissionContent}>
        To educate the world&apos;s one billion teenagers on the value of credit cards
          and how to use them wisely
      </h2>
    ),
  },
}

export default textSections
