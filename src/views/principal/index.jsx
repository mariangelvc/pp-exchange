import * as React from 'react'
import {useState} from 'react'
import {Card, Col, Container, Row} from 'react-bootstrap'
import './Index.css'
import {useQuery} from 'react-query'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import InterchangeImage from './assets/exchangeBtn.png'
import AlertIcon from './assets/Vector.png'

export function Index() {
  const [base, setBase] = useState('EUR')
  const [baseCurrency, setBaseCurrency] = useState('CAD')

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .typeError('Amount must be a number')
      .required('Amount is required')
      .test(
        'Is positive?',
        'Amount must be a positive number',
        value => value > 0,
      ),
  })

  const formik = useFormik({
    initialValues: {
      amount: '1.00',
      convertTo: 'CAD',
      convertFrom: 'EUR',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
    validationSchema,
  })

  // Returns your visitors country code by geolocating your visitor via CloudFlare IP geolocation.
  const currencies = useQuery(
    'currencies',
    async () =>
      await fetch(`${process.env.REACT_APP_API_URL}/currencies`).then(res =>
        res.json(),
      ),
  )

  // Rates quote against the EUR by default. You can quote against other currencies using the base parameter.
  const ratesBased = useQuery(['ratesBased', base], async () => {
    console.info(base)
    return await fetch(
      `${process.env.REACT_APP_API_URL}/rates?base=${base}`,
    ).then(res => res.json())
  })

  // Same as ratesBased but used to save another set of results.
  const ratesBasedCurrency = useQuery(
    ['ratesBasedCurrency', baseCurrency],
    async () => {
      console.info(baseCurrency)
      return await fetch(
        `${process.env.REACT_APP_API_URL}/rates?base=${baseCurrency}`,
      ).then(res => res.json())
    },
  )

  // Error managing
  if (
    currencies.isLoading ||
    ratesBased.isLoading ||
    ratesBasedCurrency.isLoading
  )
    return 'Loading...'
  if (currencies.error || ratesBased.error || ratesBasedCurrency.error)
    return 'An error has occurred'

  // Handle switch button
  const switchCurrencies = () => {
    setBase(formik.values.convertTo)
    formik.setFieldValue('convertTo', formik.values.convertFrom)
    formik.setFieldValue('convertFrom', formik.values.convertTo)
  }

  const formatDate = date => {
    return new Date(date).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
    })
  }

  return (
    <>
      <Container className="container">
        <Row className="row">
          <div className="col-xxl-12 main">
            <h1>
              Convert {formik.values.amount}{' '}
              {currencies.data[formik.values.convertFrom].name} to{' '}
              {currencies.data[formik.values.convertTo].name} -{' '}
              {formik.values.convertFrom} to{' '}
              {currencies.data[formik.values.convertTo].symbol}
            </h1>
          </div>
        </Row>
        <Row className="row">
          <Col className="col">
            <div className="card box">
              <Card className="card-body">
                <Row className="row">
                  <Col className="col-sm left-column">
                    {/*Form start*/}
                    <form onSubmit={formik.handleSubmit}>
                      {/*Amount start*/}
                      <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input
                          id="amount"
                          name="amount"
                          type="text"
                          className="custom-input form-control"
                          onChange={formik.handleChange}
                          value={formik.values.amount}
                          step="0.01"
                          placeholder="0.00"
                        />
                        {formik.touched.amount && formik.errors.amount ? (
                          <span className="error">{formik.errors.amount}</span>
                        ) : null}
                      </div>
                      {/*Amount end*/}

                      {/*Select currency from start*/}
                      <div className="form-group">
                        <label htmlFor="convertFrom">From</label>
                        <select
                          id="convertFrom"
                          name="convertFrom"
                          className="form-control select-box"
                          value={formik.values.convertFrom}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option
                            value=""
                            label="Select currency to convert from"
                          >
                            Select currency to convert from
                          </option>
                          {Object.keys(currencies.data).map(item => (
                            <option value={item} key={item}>
                              {item} - {currencies.data[item].name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/*Select currency from end*/}

                      {/*Interchange button*/}
                      <img
                        src={InterchangeImage}
                        alt="horse"
                        onClick={() => switchCurrencies()}
                      />
                      {/*Interchange button*/}

                      {/*Select currency to start*/}
                      <div className="form-group">
                        <label htmlFor="convertFrom">To</label>
                        <select
                          id="convertTo"
                          name="convertTo"
                          className="form-control select-box"
                          value={formik.values.convertTo}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option
                            value=""
                            label="Select currency to convert to"
                          >
                            Select currency to convert to
                          </option>
                          {Object.keys(currencies.data).map(item => (
                            <option value={item} key={item}>
                              {item} - {currencies.data[item].name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/*Select currency to end*/}
                    </form>
                    {/*Form end*/}
                  </Col>
                  <div className="col-sm">
                    <div className="r1">
                      {formik.values.amount} {formik.values.convertFrom} =
                    </div>
                    <div className="r2">
                      {formik.values.amount *
                        ratesBased.data.rates[formik.values.convertTo]}
                      {currencies.data[formik.values.convertTo].name}
                    </div>
                    <div className="title-group">
                      <div className="r3">
                        1 {currencies.data[formik.values.convertTo].symbol} =
                        {
                          ratesBasedCurrency.data.rates[
                            formik.values.convertFrom
                          ]
                        }{' '}
                        EUR
                      </div>
                      <div className="r3">
                        1 {formik.values.convertFrom} ={' '}
                        {ratesBased.data.rates[formik.values.convertTo]}{' '}
                        {currencies.data[formik.values.convertTo].symbol}
                      </div>
                    </div>

                    <div className="alert alert-warning" role="alert">
                      <div className="text-alert">
                        <img src={AlertIcon} /> We use the market rate. This is
                        for informational purposes only.
                      </div>
                    </div>
                  </div>
                </Row>
              </Card>
            </div>
          </Col>
          <p className="footer">
            Conversion from Euro to Canadian Dollar - Last updated:{' '}
            {formatDate(ratesBased.data.date)}
          </p>
        </Row>
      </Container>
    </>
  )
}
