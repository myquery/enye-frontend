/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './transaction_details.css';
import 'react-fontawesome';
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const TransactionDetails2 = (props) => {
    const [getTxDetails, setTxDetails] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    // const [payeePaymentMethod, setPayeePaymentMethod] = useState("");
    const [genderFilter, setGenderFilter] = useState(false);
    const [cardFilter, setCardFilter] = useState(false);
    const [genderType, setGenderType] = useState("");
    const [cardType, setCardType] = useState("");
    const HEADERS = {
        'content-type': 'application/json',
        'accept': 'application/json'
    };
    // const api = async (payee, payMethod) => {
    const api = async () => {
        let url = "https://api.enye.tech/v1/challenge/records";
        try {
            const resp = await axios({
                method: 'GET',
                url: url,
                headers: HEADERS
            });
            const profiles = resp.data.records.profiles;
            console.log(profiles.length);
            setTxDetails(profiles);
            setTotalCount(getTxDetails.length);
            // if(payee){
            // dataRef = resp.data.records.profiles.filter((data) => data.FirstName ===payee);
            // setTotalCount(dataRef.length);
            // setTxDetails(dataRef);
            // }else if(payMethod){
            // dataRef = resp.data.records.profiles.filter((data) => data.PaymentMethod ===payMethod);
            // setTotalCount(dataRef.length);
            // setTxDetails(dataRef);
            // }else if(payee && payMethod) {
            // dataRef = resp.data.records.profiles.filter((data) => data.FirstName === payee&& data.PaymentMethod === payMethod);
            // setTotalCount(dataRef.length);
            // setTxDetails(dataRef);
            // }else{
            // dataRef = resp.data.records.profiles;
            // setTotalCount(dataRef.length);
            // setTxDetails(dataRef);
            // }
        } catch (err) {
            console.log(err.message)
        }
    }
    const getPayeeByName = (e) => {
        // setPayeeFirstname(e.target.value)
        let payee = e.target.value;
        let dataRef = [...getTxDetails].filter((data) =>
            data.FirstName.concat(data.LastName).search(payee));
        setTotalCount(dataRef.length);
        setTxDetails(dataRef);
    }
    // const getPaymentMethod =(e) => {
    // setPayeePaymentMethod(e.target.value)
    // }
    const handleSubmit = (e ) => {
    e.preventDefault();
   // api(payeeFirstname, payeePaymentMethod );
    }
    // total records per page to display
    const recordPerPage = getTxDetails.slice(0, 20).length;
    console.log('recordPerPage', recordPerPage)
    // range of pages in paginator
    // const pageRange = 10;
    //move to nextpage
    const handleCount = (target) => {
        // for (let index in getTxDetails){
        // setCurrentIndex(index)
        // }
        // api(payeeFirstname, payeePaymentMethod );
        if (target === 'prev') {
            if (currentIndex > 1) {
                setCurrentIndex(currentIndex - 1);
            }
            return;
        } else {
            if (currentIndex < Math.ceil(totalCount / 20)) {
                setCurrentIndex(currentIndex + 1);
            }
            return;
        }
    }
    const handleGenderType = (type) => {
        if (type) {
            setGenderType(type);
            const genderTypeCount = [...getTxDetails].filter(data => data.Gender === type);
            setTxDetails(genderTypeCount);
            setTotalCount(genderTypeCount.length)
            setCurrentIndex(1);
        }
        return;
    }
    const handleCardType = (type) => {
        if (type) {
            setCardType(type);
            const cardTypeCount = [...getTxDetails].filter(data => data.CreditCardType ===
                type);
            setTxDetails(cardTypeCount);
            setTotalCount(cardTypeCount.length);
            setCurrentIndex(1);
        }
        return;
    }
    // useEffect(()=> {
    // api(payeeFirstname, payeePaymentMethod );
    // }, [payeeFirstname, payeePaymentMethod])
    console.log('getTxDetails length', getTxDetails.length);
    useEffect(() => {
        api();
        return () => {
            console.log('Cleanup UseEffect');
        }
    }, [])
    return (
        <main className="main">
            <div className="container-fluid search-container">
                <form onSubmit={handleSubmit}>
                {/* <form onSubmit=""> */}
                    <div className="row" style={{ margin: "0 auto" }}>
                        <div className="col-lg-4">
                            <div className="search-input">
                                <label htmlFor="firstname"></label>
                                <input type="text" placeholder="search details by name"
                                    id="firstname" onChange={getPayeeByName} />
                            </div>
                        </div>
                        {/* <div className="col-lg-4">
 <div className="search-input">
 <label htmlFor="payment-method"></label>
 <input type="text" placeholder="search details by payment method"
id="payment-method" onChange={getPaymentMethod}/>
 </div>
 </div> */}
                        <div className="col-lg-4">
                            <div className="search-input">
                                <button name="gender" type="submit" onClick={() =>
                                    setGenderFilter(!genderFilter)}>{!genderFilter ? "Filter By Gender" : "Remove GenderFilter"}</button>
                            </div>
                        </div>
                        {(genderFilter && (genderType !== "Male")) &&
                            <div className="col-lg-4">
                                <div className="search-input">
                                    <button name='male' type="submit" onClick={() =>
                                        handleGenderType('Male')}>Filter By Males</button>
                                </div>
                            </div>}
                        {(genderFilter && (genderType !== "Female")) &&
                            <div className="col-lg-4">
                                <div className="search-input">
                                    <button name='female' type="submit" onClick={() =>
                                        handleGenderType('Female')}>Filter By Females</button>
                                </div>
                            </div>}
                        {(genderFilter && (genderType !== "Prefer to skip")) &&
                            <div className="col-lg-4">
                                <div className="search-input">
                                    <button name="skip" type="submit" onClick={() =>
                                        handleGenderType('Prefer to skip')}>Filter By Others</button>
                                </div>
                            </div>}
                        <div className="col-lg-4">
                            <div className="search-input">
                                <button name="cardFilter" type="submit" onClick={() =>
                                    setCardFilter(!cardFilter)}>{!cardFilter ? "Filter By Credit Card Type" : "Remove CardFilter"}</button>
                            </div>
                        </div>
                        {(cardFilter && (cardType !== "VISA")) &&
                            <div className="col-lg-4">
                                <div className="search-input">
                                    <button name="visa" type="submit" onClick={() =>
                                        handleCardType('VISA')}>Filter By VISA</button>
                                </div>
                            </div>}
                        {(cardFilter && (cardType === "VISA")) &&
                            <div className="col-lg-4">
                                <div className="search-input">
                                    <button name="mastercard" type="submit" onClick={() =>
                                        handleCardType('MASTERCARD')}>Filter By MasterCard</button>
                                </div>
                            </div>}
                    </div>
                </form>
            </div>
            <div className="card-container">
                {
                    getTxDetails.length === 0 ?
                        <div><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                            <span className="sr-only">Loading...</span></div> :
                        // getTxDetails.slice(0, 20).map((data, id) => {
                        getTxDetails.slice(((currentIndex - 1) * 20), 20).map((data, id) => {
                            // let icon = data.Gender === "male" ? "fa fa-male" ?
                          //  data.Gender === "female" ? "fa fa-female" : "fa fa-genderless";
                            let icon = "";
                            
                            if (data.Gender === "Male") {
                                icon = "fa fa-male ";
                            } else if (data.Gender === "Female") {
                                icon = "fa fa-female";
                            } else {
                                icon = "fa fa-genderless ";
                            }


                            return (
                                <div className="card" key={id}>
                                    <div className="avatar">
                                        <i className={icon} aria-hidden="true"></i>{data.Gender}
                                    </div>
                                    <p className="card-header">{data.FirstName} {data.LastName}</p>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><i className="fa fa-envelope"
                                            aria-hidden="true"></i> {data.Email}</li>
                                        <li className="list-group-item"><i className="fa fa-user"
                                            aria-hidden="true"></i> {data.UserName}</li>
                                        <li className="list-group-item"><i className="fa
fa-credit-card" aria-hidden="true"></i> {data.CreditCardNumber}</li>
                                        <li className="list-group-item"><i className="fa
fa-address-card-o" aria-hidden="true"></i> {data.CreditCardType}</li>
                                        <li className="list-group-item"> <i className="fa
fa-map-marker" aria-hidden="true"></i> {data.Latitude} / {data.Longitude}</li>
                                        <li className="list-group-item"> <i className="fa
fa-address-book" aria-hidden="true"></i> {data.MacAddress}</li>
                                        <li className="list-group-item"><i className="fa fa-money"
                                            aria-hidden="true"></i> {data.PaymentMethod}</li>
                                        <li className="list-group-item"> <i className="fa
fa-phone-square" aria-hidden="true"></i> {data.PhoneNumber}</li>
                                        <li className="list-group-item"><i className="fa fa-globe"
                                            aria-hidden="true"></i> {data.URL}</li>
                                    </ul>
                                </div>
                            )
                        })
                }
            </div>
            <div className="container page-count">
                <div className="row">
                    {/* <Pagination
 itemClass="page-item"
 linkClass="page-link"
 activePage={Number(currentIndex)}
 itemsCountPerPage={recordPerPage}
 totalItemsCount={Number(totalCount)}
 pageRangeDisplayed={pageRange}
 onChange={handleCount('next')}
 /> */}
                    <div className="pagination">
                        <button onClick={() => handleCount("prev")}>Prev</button>
                        <span>page {currentIndex} of {Math.ceil(totalCount / 20)} </span>
                        <button onClick={() => { handleCount("next") }}>Next</button>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default TransactionDetails2;