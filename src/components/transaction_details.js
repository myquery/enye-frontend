import {useEffect, useState} from 'react'
import './transaction_details.css';
import axios from 'axios';
import Pagination from "react-js-pagination";
import 'react-fontawesome';
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const TransactionDetails = (props) => {

    const [getTxDetails, setTxDetails] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [payeeFirstname, setPayeeFirstname] = useState("");
    const [payeePaymentMethod, setPayeePaymentMethod] = useState("");

const HEADERS = {
        'content-type': 'application/json',
        'accept': 'application/json'
    };

const api = async (payee, payMethod) => {
    let dataRef = [];
    let url = "https://api.enye.tech/v1/challenge/records";

    try{

  
    const resp = await axios({
        method: 'GET',
        url: url,
        headers: HEADERS
    })

   console.log(resp.data.records.profiles);

   if(payee){
    dataRef = resp.data.records.profiles.filter((data) => data.FirstName ===  payee);
    setTotalCount(dataRef.length);
    setTxDetails(dataRef);
   }else if(payMethod){
    dataRef = resp.data.records.profiles.filter((data) =>  data.PaymentMethod === payMethod);
    setTotalCount(dataRef.length);
    setTxDetails(dataRef);
   }else if(payee && payMethod) {
    dataRef = resp.data.records.profiles.filter((data) => data.FirstName ===  payee &&  data.PaymentMethod===  payMethod);
    setTotalCount(dataRef.length);
    setTxDetails(dataRef);
   }else{
     dataRef = resp.data.records.profiles;
     setTotalCount(dataRef.length);
     setTxDetails(dataRef);
   }

  }catch(err){
      console.log(err.message)
  }
  

} 

const getPayeeFirstname =(e) => {
    setPayeeFirstname(e.target.value)
    
}

const getPaymentMethod =(e) => {
    setPayeePaymentMethod(e.target.value)
}

const handleSubmit = (e ) => {
    e.preventDefault();
    api(payeeFirstname, payeePaymentMethod );

}

 // total records per page to display
 const recordPerPage = getTxDetails.slice(0, 20).length;
 console.log(recordPerPage)

 // range of pages in paginator
 const pageRange = 10;

 //move to nextpage
const handleCount = () => {
    for (let index in getTxDetails){
       setCurrentIndex(index) 
    }
    api(payeeFirstname, payeePaymentMethod );
    
}

useEffect(()=> {
    api(payeeFirstname, payeePaymentMethod );
}, [payeeFirstname, payeePaymentMethod])

    return(
        <main className="main">
            <div className="container-fluid search-container">
            <form onSubmit={handleSubmit}>
                <div className="row" style={{margin:"0 auto"}}>
        
                <div className="col-lg-4">
                   <div className="search-input">
                    <label htmlFor="firstname"></label>
                    <input type="text" placeholder="search details by firstname" id="firstname" onChange={getPayeeFirstname}/>
                </div>   
                </div>
                <div className="col-lg-4">
                   <div className="search-input">
                    <label htmlFor="payment-method"></label>
                    <input type="text" placeholder="search details by payment method" id="payment-method" onChange={getPaymentMethod}/>
                </div>   
                </div>
                <div className="col-lg-4">
                  <div className="search-input">
                 <button type="submit">Filter</button>
                </div>   
                </div>
                
              
               
                </div>
                </form>
                
            </div>
            <div className="card-container">
            {
               getTxDetails.length === 0 ? <div><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
               <span class="sr-only">Loading...</span></div> :
                    getTxDetails.slice(0, 20).map((data, id) => {
                    //    let icon = data.Gender === "male" ? "fa fa-male" ? data.Gender === "female" ? "fa fa-female": "fa fa-genderless";

                  let icon = "";

                        if(data.Gender === "Male"){
                            icon = "fa fa-male ";
                        }else if(data.Gender === "Female"){
                            icon = "fa fa-female";
                        }else{
                            icon = "fa fa-genderless ";  
                        }
                        return(
                            <div className="card" key={id}>
        
                        <div className="avatar">
                            
                            <i className={icon} aria-hidden="true"></i>{data.Gender}
                            </div>
                        <p className="card-header">{data.FirstName} {data.LastName}</p>
                     
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><i className="fa fa-envelope" aria-hidden="true"></i> {data.Email}</li>
                        <li class="list-group-item"><i class="fa fa-user" aria-hidden="true"></i> {data.UserName}</li>
                        <li class="list-group-item"><i class="fa fa-credit-card" aria-hidden="true"></i> {data.CreditCardNumber}</li>
                        <li class="list-group-item"><i class="fa fa-address-card-o" aria-hidden="true"></i> {data.CreditCardType}</li>
                        <li class="list-group-item"> <i class="fa fa-map-marker" aria-hidden="true"></i> {data.Latitude} / {data.Longitude}</li>
                         <li class="list-group-item">   <i class="fa fa-address-book" aria-hidden="true"></i> {data.MacAddress}</li>
                        <li class="list-group-item"><i class="fa fa-money" aria-hidden="true"></i> {data.PaymentMethod}</li>
                        <li class="list-group-item"> <i class="fa fa-phone-square" aria-hidden="true"></i> {data.PhoneNumber}</li>
                        <li class="list-group-item"><i class="fa fa-globe" aria-hidden="true"></i> {data.URL}</li>
                        </ul>

                     
                        </div>
            
                        )
                    })

                   
                }

        
                </div>
                
                        
                <div className="container page-count">
                    <div className="row">
                    
                    <Pagination 
                itemClass="page-item" 
                linkClass="page-link"
                activePage={Number(currentIndex)}
                 itemsCountPerPage={recordPerPage}
                 totalItemsCount={Number(totalCount)}
                 pageRangeDisplayed={pageRange}
                 onChange={handleCount}
                /></div>
</div>
        </main>
    )
}
export default TransactionDetails;