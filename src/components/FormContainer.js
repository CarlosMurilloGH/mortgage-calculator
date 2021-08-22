import React, { useState } from "react";
import "./FormContainer.css"
import numeral from "numeral";

const FormContainer= ()=>{

    const [purchasePrice,setPurchasePrice] = useState("");
    const [downPayment,setDownPayment] = useState("");
    const [loanTerm,setLoanTerm] = useState("");
    const [loanApr,setLoanApr] = useState("");
    const [monthlyPayments,setMonthlyPayments] = useState(0.0);

    const submitCalculation = async(e) =>{
        e.preventDefault();

        const validatedPrice = await validateField(purchasePrice, setPurchasePrice);
        const validatedDownPayment = await validateField(downPayment, setDownPayment);
        const validatedLoanTerm = await validateField(loanTerm,setLoanTerm);
        const validatedApr = await validateField(loanApr,setLoanApr);


        if(
            validatedPrice &&
            validatedDownPayment &&
            validatedLoanTerm &&
            validatedApr
        ) {
            calculateValues();
        }
    };

    const calculateValues = () =>{
        let principal = purchasePrice - downPayment;
        let monthlyInterest= loanApr/100/12;
        let numberOfPayments = loanTerm*12;
        let monthlyPrice= (principal* [monthlyInterest * (1+monthlyInterest) * numberOfPayments])/
        [(1+monthlyInterest) * numberOfPayments-1];

        setMonthlyPayments(monthlyPrice);
    };

    const validateField=(field,setValue) =>{
        let int=parseFloat(field);

        if(field ==="" || field ===0){
            setValue({...field.values, error:"Please enter a value"});
            return false;
        } else if (isNaN(int)) {
            setValue({...field.values, error:"Please enter a number"});
            return false;
        }else {
            setValue(int);
            return true;
        }
    };

    return(
        <div className="FormContainer">
            <div className="FormTitle">
                <h1>Mortgage Calculator</h1>
            </div>

            <div className="Form">
                
                <div className="HomePrice">
                    <label className="home">Home Price</label>
                    <p>{purchasePrice.error}</p>
                    <input type="text" onChange={(e) => setPurchasePrice(e.target.value)} placeholder="$" />
                </div>

                <div className="DownPayment">
                    <label>Down Payment</label>
                    <p>{downPayment.error}</p>
                    <input type="text" onChange={(e) => setDownPayment(e.target.value)} placeholder="$"/>
                </div>

                <div className="LoanTerm">
                <label>Loan Term(Years)</label>
                <p>{loanTerm.error}</p>
                <input type="text" onChange={(e) => setLoanTerm(e.target.value)} placeholder="Years"/>
                </div>

                <div className="APR">
                <label>APR(%)</label>
                <p>{loanApr.error}</p>
                <input type="text" onChange={(e) => setLoanApr(e.target.value)} placeholder="%"/>
                </div>

                <div className="submit">
                <button type="submit" onClick={(e)=>submitCalculation(e)}>CALCULATE</button>
                </div>

            </div>

            <div className="Result">
                <h3>Estimate Monthly Payment:{numeral(monthlyPayments).format("$0,0.00")}</h3>
            </div>
        </div>
    )
}

export default FormContainer;