import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cards from '../Cards'
import {
  BgContainer,
  Heading,
  HorizontalLine,
  ResultContainer,
  UnorderedList,
} from './styledComponents'

const possibleViews = {
  initial: 'INITIAL',
  in_progress: 'IN PROGRESS',
  success: 'SUCCESS',
}

class TravelGuide extends Component {
  state = {activeView: possibleViews.initial, activeList: []}

  componentDidMount() {
    this.getTravelDetails()
  }

  getTravelDetails = async () => {
    this.setState({activeView: possibleViews.in_progress})
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.packages.map(each => ({
      id: each.id,
      description: each.description,
      name: each.name,
      imageUrl: each.image_url,
    }))
    this.setState({activeView: possibleViews.success, activeList: updatedData})
  }

  renderOnInProgress = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderOnSuccess = () => {
    const {activeList} = this.state
    return (
      <UnorderedList>
        {activeList.map(each => (
          <Cards key={each.id} details={each} />
        ))}
      </UnorderedList>
    )
  }

  renderOnOutput = () => {
    const {activeView} = this.state
    switch (true) {
      case activeView === possibleViews.in_progress:
        return this.renderOnInProgress()
      case activeView === possibleViews.success:
        return this.renderOnSuccess()
      default:
        return null
    }
  }

  render() {
    return (
      <BgContainer>
        <Heading>Travel Guide</Heading>
        <HorizontalLine />
        <ResultContainer>{this.renderOnOutput()}</ResultContainer>
      </BgContainer>
    )
  }
}
export default TravelGuide
