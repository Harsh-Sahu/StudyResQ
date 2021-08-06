import React from "react";

const contact = ()=>{
    return(
        <>
        <div className="contact-info">
            <div className="container col-lg-8">
                <div className="row justify-content-between mt-lg-5 ">
                    <div className="col-lg-4 text-center">
                        <h4>Phone</h4>
                        <p>1234567890</p>
                    </div>
                    <div className="col-lg-4 text-center">
                        <h4>Email</h4>
                        <p>studyresq@gmail.com</p>
                    </div>
                    <div className="col-lg-4 text-center">
                        <h4>Address</h4>
                        <p>Pune, Maharashtra</p>
                    </div>
                </div>
            </div>
            <div className="container  col-lg-10 text-center">
                <div className="col-lg-10 offset-1 mt-5">
                    <h3 className="text-center">contact Us</h3>
                    <form className="mt-4" method="POST">
                        <div class="row">
                            <div class="col">
                            {/* <input onChange={SendMsg} value={userData.name} type="text" class="form-control" name="name" required="true"  placeholder="Your Name"/> */}
                            <input type="text" class="form-control" name="name" required="true"  placeholder="Your Name"/>
                            </div>
                            <div class="col">
                            {/* <input onChange={SendMsg} value={userData.email} type="email" class="form-control" name="email" required="true"  placeholder="Your Email"/> */}
                            <input type="email" class="form-control" name="email" required="true"  placeholder="Your Email"/>
                            </div>
                            <div class="col">
                            {/* <input onChange={SendMsg} value={userData.phone} type="tel" class="form-control" name="phone" required="true"  placeholder="Your phone Number"/> */}
                            <input type="tel" class="form-control" name="phone" required="true"  placeholder="Your phone Number"/>
                            </div>
                        </div>
                        <div class="form-group mt-3">
                            {/* <textarea onChange={SendMsg} value={userData.message} class="form-control" name="message" placeholder="Message" rows="7" ></textarea> */}
                            <textarea class="form-control" name="message" placeholder="Message" rows="7" ></textarea>
                        </div>
                        {/* <button onClick={contactForm} type="submit" className="btn btn-primary" >Send Message</button> */}
                        <div className="pt-2">
                        <button type="submit" className="btn btn-primary" >Send Message</button>
                        </div>
                    </form>
                </div>
            </div>    
        </div>
        </>
    )
}

export default contact;
