import { useEffect, useState } from 'react'
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
    const [filterVal, setFilterVal] = useState("");
    // const [payeePaymentMethod, setPayeePaymentMethod] = useState("");

    const HEADERS = {
        'content-type': 'application/json',
        'accept': 'application/json'
    };

    const api = async (filter) => {

        let url = "https://api.enye.tech/v1/challenge/records";

        try {


            const resp = await axios({
                method: 'GET',
                url: url,
                headers: HEADERS
            })

            console.log(resp.data.records.profiles);

            const apiFilter = (filter) => {
              if (filter) {
                    return resp.data.records.profiles.filter((data) => data.Gender === filter || data.PaymentMethod === filter);
                } else {
                    return resp.data.records.profiles
                }
            }

            setTxDetails(apiFilter(filterVal ))

            setTotalCount(resp.data.records.profiles.length)


        } catch (err) {
            console.log(err.message)
        }


    }


    // const getPayeeFirstname = (e) => {
    //     setPayeeFirstname(e.target.value)

    // }

    const handleFilter = (e) => {
        console.log(e.target.value)
        setFilterVal(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        api(filterVal);


    }

    // total records per page to display
    const recordPerPage = getTxDetails.slice(0, 20).length;
    console.log(recordPerPage)

    // range of pages in paginator
    const pageRange = 5;

    //move to nextpage
    const handleCount = () => {
        for (let index in getTxDetails) {
            setCurrentIndex(index)
        }
        api(filterVal);

    }

    useEffect(() => {


        api(filterVal);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterVal])

    return (
        <main className="main">
            <div className="container-fluid search-container">
                <form onSubmit={handleSubmit}>
                    <div className="row" style={{ margin: "0 auto" }}>

                        <div className="col-lg-6">
                            <div className="search-input">
                                <label htmlFor="gender"></label>
                                <select class="form-select" 
                                aria-label="Default select example" 
                                placeholder="search details by firstname" 
                                id="gender" 
                                onChange={handleFilter} >
                                    <option selected>Filter by Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                               
                                    </select>
                
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="search-input">
                                <label htmlFor="PaymentMethod"></label>
                                <select class="form-select" 
                                aria-label="Default select example" 
                                placeholder="search details by firstname" 
                                id="PaymentMethod" 
                                onChange={handleFilter} >
                                    <option selected>Filter by PaymentMethod</option>
                                    <option value="paypal">Paypal</option>
                                    <option value="money order">Money order</option>
                                    <option value="check">Check</option>
                                    <option value="cc">Credit Card</option>
                               
                                    </select>
                
                            </div>
                        </div>
             



                    </div>
                </form>

            </div>


            <div className="container page-count">
                <div className="row">

                    <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="page-item active"
                        activePage={Number(currentIndex)}
                        itemsCountPerPage={recordPerPage}
                        totalItemsCount={Number(totalCount)}
                        pageRangeDisplayed={pageRange}
                        onChange={handleCount}
                    /></div>
            </div>
            <div className="card-container">
                {
                    getTxDetails.length === 0 ? <div><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                        <span class="sr-only">Loading...</span></div> :
                        getTxDetails.slice(0, 20).map((data, id) => {
                            //    let icon = data.Gender === "male" ? "fa fa-male" ? data.Gender === "female" ? "fa fa-female": "fa fa-genderless";

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
                                        <li className="list-group-item"><i className="fa fa-envelope" aria-hidden="true"></i> {data.Email}</li>
                                        <li className="list-group-item"><i className="fa fa-user" aria-hidden="true"></i> {data.UserName}</li>
                                        <li className="list-group-item"><i className="fa fa-credit-card" aria-hidden="true"></i> {data.CreditCardNumber}</li>
                                        <li className="list-group-item"><i className="fa fa-address-card-o" aria-hidden="true"></i> {data.CreditCardType}</li>
                                        <li className="list-group-item"> <i className="fa fa-map-marker" aria-hidden="true"></i> {data.Latitude} / {data.Longitude}</li>
                                        <li className="list-group-item">   <i className="fa fa-address-book" aria-hidden="true"></i> {data.MacAddress}</li>
                                        <li className="list-group-item"><i className="fa fa-money" aria-hidden="true"></i> {data.PaymentMethod}</li>
                                        <li className="list-group-item"> <i className="fa fa-phone-square" aria-hidden="true"></i> {data.PhoneNumber}</li>
                                        <li className="list-group-item"><i className="fa fa-globe" aria-hidden="true"></i> {data.URL}</li>
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
