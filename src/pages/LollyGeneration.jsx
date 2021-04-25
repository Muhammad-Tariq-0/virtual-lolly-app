import React from "react"
import { useState } from "react";
import Lolly from "./lolly"
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Formik } from "formik"

import { navigate } from "gatsby";
const ADD_LOLLY = gql`
mutation addLolly($c1: String!,$c2: String!,$c3: String!, $sender: String!,$message: String!,$rec: String!){
  addLolly(c1: $c1,c2: $c2,c3:$c3,sender: $sender,message: $message, rec: $rec){
  link
  }
    }`
const LollyGeneration = () => {
  const [addLolly] = useMutation(ADD_LOLLY)
  const [c1, setC1] = useState("#3c1321");
  const [c2, setC2] = useState("#e95946");
  const [c3, setC3] = useState("#e95946");
  return (
    <div className="container-top">
     <h1 className='title'>virtual lollipop</h1>
      <p class="subtitle">because we all know someone who deserves some sugar.</p>
      <div className="main-container">
        <div>
        <Lolly top={c1} middle={c2} bottom={c3} className='lolly-mobile'/>
        <p>Make a New Lolly Using Colors</p>
        <input type="color" value={c1} onChange={(e) => { setC1(e.target.value) }} className='circle'/>
        <input type="color" value={c2} onChange={(e) => { setC2(e.target.value) }} className='circle'/>
        <input type="color" value={c3} onChange={(e) => { setC3(e.target.value) }} className='circle'/></div>
        <div className="form-container">
          <Formik
            initialValues={{ rec: '', message: '', from: '' }}
            validate={values => {
              const errors = {};
              if (!values.rec) {
                errors.rec = 'Required';
              } if (!values.message) {
                errors.message = 'Required';
              } if (!values.from) {
                errors.from = 'Required';
              }


              return errors;

            }}
            onSubmit={(values, { resetForm }) => {
              addLolly({
                variables: {
                  c1,
                  c2,
                  c3,
                  sender: values.from,
                  message: values.message,
                  rec: values.rec,
                },
              }).then(result => {
                navigate(`/lollies/${result.data.addLolly.link}`)
              });
              resetForm({})

            }



            }
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              /* and other goodies */
            }) => (
                <form noValidate autoComplete="off"
                  onSubmit={handleSubmit}
                className='sender-form'
                >
                  To: <br/>
                  <input
                  className="text-field"
                    id="standard-basic"
                    type="text"
                    name="rec"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.rec}
                  /><br />

                  {errors.rec && touched.rec && errors.rec}
                  <br />
                  Say Something: <br/>
                  <textarea
                    id="standard-basic"
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}

                  /><br />
                  {errors.message && touched.message && errors.message}
                  <br />
                  From: <br/>
                  <input
                  className="text-field"
                    id="standard-basic"
                    type="text"
                    name="from"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.from}

                  /><br />
                  {errors.from && touched.from && errors.from}
                  <br />


                  <button className="add-new" type="submit">Send</button>

                </form>
              )}
          </Formik>

        </div>
      </div>
    </div>
  )
}


export default LollyGeneration
