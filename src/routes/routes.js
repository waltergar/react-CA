import HomePage from 'pages/HomePage/HomePage'
import LoginPage from 'pages/LoginPage/LoginPage'
import SignUpPage from 'pages/SignUpPage/SignUpPage'
import DashboardPage from 'pages/DashboardPage/DashboardPage'
import RegisterEmailPage from 'pages/RegisterEmailPage/RegisterEmailPage'
import RegisterChildPage from 'pages/RegisterChildPage/RegisterChildPage'
import OurStoryPage from 'pages/OurStoryPage/OurStoryPage'
import ChoreMoneyPage from 'pages/ChoreMoneyPage/ChoreMoneyPage'
import ScoreEmojisPage from 'pages/ScoreEmojisPage/ScoreEmojisPage'
import FaqsPage from 'pages/FaqPage/FaqPage'
import ProgramPage from 'pages/ProgramPage/ProgramPage'
import CardholderAgreementPage from 'pages/CardholderAgreementPage/CardholderAgreementPage'
import BankPrivacyPage from 'pages/BankPrivacyPage/BankPrivacyPage'
import PrivacyPage from 'pages/PrivacyPage/PrivacyPage'
import ESignPage from 'pages/ESignPage/ESignPage'
import TermsPage from 'pages/TermsPage/TermsPage'
import FeesPage from 'pages/FeesPage/FeesPage'
import PasswordResetPage from 'pages/PasswordResetPage/PasswordResetPage'

import JoinWaitlist from 'components/Homepage/JoinWaitlist/JoinWaitlist'
import ContactUs from 'components/Homepage/ContactUs/ContactUs'

export const HOME = '/'
export const DASHBOARD = '/dashboard'
export const SIGN_UP = '/sign-up'
export const SIGN_IN = '/sign-in'
export const PASSWORD_RESET = '/sign-in/forgot'
export const REGISTER_EMAIL = '/login/confirmation'
export const REGISTER_CHILD = '/join'
export const OUR_STORY = '/our-story'
export const CHORE_MONEY = '/chore-money'
export const SCORE_EMOJIS = '/score-emojis'
export const FAQS = '/faqs'
export const PROGRAM = '/program'
export const CARDHOLDERAGREEMENT = '/cardholderagreement'
export const BANKPRIVACY = '/bankprivacy'
export const PRIVACY = '/privacy'
export const ESIGN = '/esign'
export const TERMS = '/terms'
export const FEES = '/fees'
export const SUBSCRIBE = '/subscribe'
export const CONTACT_US = '/contact-us'

export const ROUTES = [
  { path: HOME, component: HomePage, exact: true },
  { path: SIGN_IN, component: LoginPage, exact: true },
  { path: PASSWORD_RESET, component: PasswordResetPage, exact: true },
  { path: SIGN_UP, component: SignUpPage },
  { path: REGISTER_EMAIL, component: RegisterEmailPage },
  { path: REGISTER_CHILD, component: RegisterChildPage },
  { path: OUR_STORY, component: OurStoryPage },
  { path: CHORE_MONEY, component: ChoreMoneyPage },
  { path: SCORE_EMOJIS, component: ScoreEmojisPage },
  { path: PROGRAM, component: ProgramPage },
  { path: CARDHOLDERAGREEMENT, component: CardholderAgreementPage },
  { path: FAQS, component: FaqsPage },
  { path: BANKPRIVACY, component: BankPrivacyPage },
  { path: PRIVACY, component: PrivacyPage },
  { path: ESIGN, component: ESignPage },
  { path: TERMS, component: TermsPage },
  { path: FEES, component: FeesPage },
  { path: SUBSCRIBE, component: JoinWaitlist },
  { path: CONTACT_US, component: ContactUs },
  { path: DASHBOARD, protected: true, component: DashboardPage },
  { component: HomePage, default: true },
]
