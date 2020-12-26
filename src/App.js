import { Cards, Chart, CountryPicker } from './components'
import React from 'react';
import styles from './App.module.css';
import { fetchData } from './api'

class App extends React.Component {
  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData})
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    let modifiedData = {data: fetchedData, country: country };
    if (modifiedData.country === "United States") {
      modifiedData.country = "USA";
    }
    this.setState({ data: fetchedData, country: modifiedData.country })
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
