import React from 'react'
import { Router } from '@reach/router';
import { useQuery,  } from '@apollo/client';
import Lolly from './NewLolly';
import gql from 'graphql-tag';
import source from '../images/source.gif'
const GET_LOLLY=gql`
query MyQuery {
  
  getLolly  {
    id 
      c1 
      c2 
      c3 
      sender 
      message 
      rec 
      link 
    }
    }
  
`;
export default function LolliesToView() {
    const { data, loading, error } = useQuery(GET_LOLLY);
    console.log(data)
    if (loading) {
        return <center><img src={source} alt='loading...'/></center> 
    }
    if (error) {
      return <h1>Web Page Not Found 404...</h1>
  }
    return (
        <Router basepath="/lollies">
           {data.getLolly.map((value,key)=>{
               return( 
               <Lolly key={key} pageContext={value} path={`/${value.link}`}> </Lolly>
               )
           })}
        </Router>
    )
}