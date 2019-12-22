import React, { Component } from 'react'

import { Row, Col } from 'components/Core/Section/Section'
import faceImage1 from 'assets/images/faces/face1.jpg'
import faceImage2 from 'assets/images/faces/face2.jpg'
import faceImage3 from 'assets/images/faces/face3.jpg'
import faceImage4 from 'assets/images/faces/face4.jpg'
import faceImage5 from 'assets/images/faces/face5.jpg'
import faceImage6 from 'assets/images/faces/face6.jpg'
import faceImage7 from 'assets/images/faces/face7.jpg'
import faceImage8 from 'assets/images/faces/face8.jpg'
import styles from './CreditAcademyCommunity.scss'


class CreditAcademyCommunity extends Component {
  state = {
    isMobile: false,
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions = () => {
    const isMobile = window.innerWidth < 992
    this.setState(prevState => ({ ...prevState, isMobile }))
  }

  render() {
    const { isMobile } = this.state

    return (
      <div className={styles.CreditAcademyCommunity} id='our-community'>
        <Row>
          <Col md='12'>
            <div className={styles.photoSection}>
              <img src={faceImage1} alt='Community Member' />
              <img src={faceImage2} alt='Community Member' />
              <img src={faceImage3} alt='Community Member' />
              <img src={faceImage4} alt='Community Member' />
              <img src={faceImage5} alt='Community Member' />
              <img src={faceImage6} alt='Community Member' />
              { !isMobile && <img src={faceImage7} alt='Community Member' /> }
              { !isMobile && <img src={faceImage8} alt='Community Member' /> }
            </div>
          </Col>
        </Row>
        <Row>
          <Col md='1' />
          <Col md='10'>
            <span>
              Join a community of parents teaching their offspring the value of paying for
              purchases made using a Credit Academy Mastercard.
            </span>
          </Col>
          <Col md='1' />
        </Row>
      </div>
    )
  }
}
export default CreditAcademyCommunity
