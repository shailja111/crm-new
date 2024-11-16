import "./style.css"
import { FaCircle } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { FaRegSmile } from "react-icons/fa";
import { FaPaperclip } from "react-icons/fa6";

const Chat=()=>{
    return(
        <div>
        <div className='container-fluid mt-100'>
           <div className="row g-2">
              <div className="col-xl-3 col-lg-5 col-md-5 col-12 mt-4 p-1">
                 <div className="card border-0 rounded shadow">
                    <div className="text-center p-4 border-bottom">
                       <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-md rounded-pill shadow" alt=""/>
                       <h5 className="mt-3 mb-0">Cristina Julia</h5>
                       <p className="text-muted mb-0">UI / UX Designer</p>
                    </div>
                    <div className="p-2 chat chat-list scroll-height" data-simplebar="init"  id="mex-h">
                       <div className="simplebar-wrapper">
                          <div className="simplebar-height-auto-observer-wrapper">
                             <div className="simplebar-height-auto-observer"></div>
                          </div>
                          <div className="simplebar-mask">
                             <div className="simplebar-offset">
                                <div className="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content" >
                                   <div className="simplebar-content">
                                      <a href="#" className="d-flex chat-list active p-2 rounded position-relative">
                                         <div className="position-relative">
                                            <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                            <FaCircle className="text-success on-off align-text-bottom"/>
                                         </div>
                                         <div className="overflow-hidden flex-1 ms-2">
                                            <div className="d-flex justify-content-between">
                                               <h6 className="text-dark mb-0 d-block">Christopher</h6>
                                               <small className="text-muted">10 Min</small>
                                            </div>
                                            <div className="text-muted text-truncate">Hello</div>
                                         </div>
                                      </a>
                                      <a href="#" className="d-flex chat-list p-2 mt-2 rounded position-relative">
                                         <div className="position-relative">
                                            <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                            <FaCircle className="text-success text-danger on-off align-text-bottom"/>
                                         </div>
                                         <div className="overflow-hidden flex-1 ms-2">
                                            <div className="d-flex justify-content-between">
                                               <h6 className="text-dark mb-0 d-block">Dr. Cristino</h6>
                                               <small className="text-muted">20 Min</small>
                                            </div>
                                            <div className="justify-content-between">
                                               <span className="badge bg-soft-danger float-end">2</span>
                                               <span className="text-dark h6 mb-0 text-truncate">Hi, How are you?</span>
                                            </div>
                                         </div>
                                      </a>
                                      <a href="#" className="d-flex chat-list p-2 mt-2 rounded position-relative">
                                         <div className="position-relative">
                                            <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                            <FaCircle className="text-success text-danger on-off align-text-bottom"/>
                                         </div>
                                         <div className="overflow-hidden flex-1 ms-2">
                                            <div className="d-flex justify-content-between">
                                               <h6 className="text-dark mb-0 d-block">Faye</h6>
                                               <small className="text-muted">30 Min</small>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                               <div className="text-muted text-truncate">Heyy</div>
                                            </div>
                                         </div>
                                      </a>
                                      <a href="#" className="d-flex chat-list p-2 mt-2 rounded position-relative">
                                         <div className="position-relative">
                                            <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                            <FaCircle className="text-success text-danger on-off align-text-bottom"/>
                                         </div>
                                         <div className="overflow-hidden flex-1 ms-2">
                                            <div className="d-flex justify-content-between">
                                               <h6 className="text-dark mb-0 d-block">Ronald</h6>
                                               <small className="text-muted">2 Hours</small>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                               <div className="text-muted text-truncate">Hey, How are you sir?</div>
                                            </div>
                                         </div>
                                      </a>
                                      <a href="#" className="d-flex chat-list p-2 mt-2 rounded position-relative">
                                         <div className="position-relative">
                                            <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                            <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                         </div>
                                         <div className="overflow-hidden flex-1 ms-2">
                                            <div className="d-flex justify-content-between">
                                               <h6 className="text-dark mb-0 d-block">Melissa</h6>
                                               <small className="text-muted">3 Hours</small>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                               <div className="text-muted text-truncate">Good Afternoon</div>
                                            </div>
                                         </div>
                                      </a>
                                      <a href="#" className="d-flex chat-list p-2 mt-2 rounded position-relative">
                                         <div className="position-relative">
                                            <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                            <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                         </div>
                                         <div className="overflow-hidden flex-1 ms-2">
                                            <div className="d-flex justify-content-between">
                                               <h6 className="text-dark mb-0 d-block">Elsie</h6>
                                               <small className="text-muted">10 Hours</small>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                               <div className="text-muted text-truncate">Good Morning sir, how can i help you?</div>
                                            </div>
                                         </div>
                                      </a>
                                      <a href="#" className="d-flex chat-list p-2 mt-2 rounded position-relative">
                                         <div className="position-relative">
                                            <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                            <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                         </div>
                                         <div className="overflow-hidden flex-1 ms-2">
                                            <div className="d-flex justify-content-between">
                                               <h6 className="text-dark mb-0 d-block">Jerry</h6>
                                               <small className="text-muted">16 Hours</small>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                               <div className="text-muted text-truncate">Please give me appointment</div>
                                            </div>
                                         </div>
                                      </a>
                                      <a href="#" className="d-flex chat-list p-2 mt-2 rounded position-relative">
                                         <div className="position-relative">
                                            <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                            <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                         </div>
                                         <div className="overflow-hidden flex-1 ms-2">
                                            <div className="d-flex justify-content-between">
                                               <h6 className="text-dark mb-0 d-block">Louis</h6>
                                               <small className="text-muted">1 Days</small>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                               <div className="text-muted text-truncate">Hii</div>
                                            </div>
                                         </div>
                                      </a>
                                      <a href="#" className="d-flex chat-list p-2 mt-2 rounded position-relative">
                                         <div className="position-relative">
                                            <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                            <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                         </div>
                                         <div className="overflow-hidden flex-1 ms-2">
                                            <div className="d-flex justify-content-between">
                                               <h6 className="text-dark mb-0 d-block">Randall</h6>
                                               <small className="text-muted">2 Days</small>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                               <div className="text-muted text-truncate">Hello Sir</div>
                                            </div>
                                         </div>
                                      </a>
                                      <a href="#" className="d-flex chat-list p-2 mt-2 rounded position-relative">
                                         <div className="position-relative">
                                            <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                            <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                         </div>
                                         <div className="overflow-hidden flex-1 ms-2">
                                            <div className="d-flex justify-content-between">
                                               <h6 className="text-dark mb-0 d-block">Mary</h6>
                                               <small className="text-muted">3 Days</small>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                               <div className="text-muted text-truncate">How are you sir?</div>
                                            </div>
                                         </div>
                                      </a>
                                      <a href="#" className="d-flex chat-list p-2 mt-2 rounded position-relative">
                                         <div className="position-relative">
                                            <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                            <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                         </div>
                                         <div className="overflow-hidden flex-1 ms-2">
                                            <div className="d-flex justify-content-between">
                                               <h6 className="text-dark mb-0 d-block">Lester</h6>
                                               <small className="text-muted">4 Days</small>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                               <div className="text-muted text-truncate">Hello please give me answer.</div>
                                            </div>
                                         </div>
                                      </a>
                                   </div>
                                </div>
                             </div>
                          </div>
                          <div className="simplebar-placeholder"></div>
                       </div>
                       <div className="simplebar-track simplebar-horizontal">
                          <div className="simplebar-scrollbar"></div>
                       </div>
                       <div className="simplebar-track simplebar-vertical">
                          <div className="simplebar-scrollbar"></div>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="col-xl-9 col-lg-7 col-md-7 col-12 mt-4 p-1">
                 <div className="card chat chat-person border-0 shadow rounded">
                    <div className="d-flex justify-content-between align-items-center border-bottom p-4">
                       <div className="d-flex">
                          <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                          <div className="overflow-hidden ms-3 user-m">
                             <a href="#" className="text-dark mb-0 h6 d-block text-truncate">Calvin Carlo</a>
                             <small>
                                <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                Online 
                             </small>
                          </div>
                       </div>
                    </div>
                    <ul className="p-4 list-unstyled mb-0 chat simplebar-scrollable-y" data-simplebar="init" 
                       >
                       <div className="simplebar-wrapper">
                          <div className="simplebar-height-auto-observer-wrapper">
                             <div className="simplebar-height-auto-observer"></div>
                          </div>
                          <div className="simplebar-mask">
                             <div className="simplebar-offset" >
                                <div className="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content">
                                   <div className="simplebar-content">
                                      <li>
                                         <div className="d-inline-block">
                                            <div className="d-flex chat-type mb-3">
                                               <div className="position-relative">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                  <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                               </div>
                                               <div className="chat-msg">
                                                  <p className="msg text-muted small shadow px-3 py-2 rounded mb-1">Hey Cristina</p>
                                                  <small className="text-muted msg-time">
                                                     <IoTimeOutline className="me-1" />
                                                     59 min ago
                                                  </small>
                                               </div>
                                            </div>
                                         </div>
                                      </li>
                                      <li className="chat-right">
                                         <div className="d-inline-block">
                                            <div className="d-flex chat-type mb-3">
                                               <div className="position-relative chat-user-image">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                  <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                               </div>
                                               <div className="chat-msg">
                                                  <p className="msg text-muted small shadow px-3 py-2 rounded mb-1">Hello Calvin</p>
                                                  <small className="text-muted msg-time">
                                                     <IoTimeOutline className="me-1" />
                                                     45 min ago
                                                  </small>
                                               </div>
                                            </div>
                                         </div>
                                      </li>
                                      <li className="chat-right">
                                         <div className="d-inline-block">
                                            <div className="d-flex chat-type mb-3">
                                               <div className="position-relative chat-user-image">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                  <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                               </div>
                                               <div className="chat-msg">
                                                  <p className="msg text-muted small shadow px-3 py-2 rounded mb-1">How can i help you?</p>
                                                  <small className="text-muted msg-time">
                                                     <IoTimeOutline className="me-1" />
                                                     44 min ago
                                                  </small>
                                               </div>
                                            </div>
                                         </div>
                                      </li>
                                      <li>
                                         <div className="d-inline-block">
                                            <div className="d-flex chat-type mb-3">
                                               <div className="position-relative">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                  <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                               </div>
                                               <div className="chat-msg">
                                                  <p className="msg text-muted small shadow px-3 py-2 rounded mb-1">Nice to meet you</p>
                                                  <small className="text-muted msg-time">
                                                     <IoTimeOutline className="me-1" />
                                                     42 min ago
                                                  </small>
                                               </div>
                                            </div>
                                         </div>
                                      </li>
                                      <li>
                                         <div className="d-inline-block">
                                            <div className="d-flex chat-type mb-3">
                                               <div className="position-relative">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                  <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                               </div>
                                               <div className="chat-msg">
                                                  <p className="msg text-muted small shadow px-3 py-2 rounded mb-1">Hope you are doing fine?</p>
                                                  <small className="text-muted msg-time">
                                                     <IoTimeOutline className="me-1" />
                                                     40 min ago
                                                  </small>
                                               </div>
                                            </div>
                                         </div>
                                      </li>
                                      <li className="chat-right">
                                         <div className="d-inline-block">
                                            <div className="d-flex chat-type mb-3">
                                               <div className="position-relative chat-user-image">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                  <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                               </div>
                                               <div className="chat-msg">
                                                  <p class="msg text-muted small shadow px-3 py-2 rounded mb-1">I'm good thanks for asking</p>
                                                  <small class="text-muted msg-time">
                                                     <IoTimeOutline className="me-1" />
                                                     45 min ago
                                                  </small>
                                               </div>
                                            </div>
                                         </div>
                                      </li>
                                      <li>
                                         <div className="d-inline-block">
                                            <div className="d-flex chat-type mb-3">
                                               <div className="position-relative">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                  <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                               </div>
                                               <div className="chat-msg">
                                                  <p className="msg text-muted small shadow px-3 py-2 rounded mb-1">I am intrested to know more about your prices and services you offer</p>
                                                  <small className="text-muted msg-time">
                                                     <IoTimeOutline className="me-1" />
                                                     35 min ago
                                                  </small>
                                               </div>
                                            </div>
                                         </div>
                                      </li>
                                      <li className="chat-right">
                                         <div className="d-inline-block">
                                            <div className="d-flex chat-type mb-3">
                                               <div className="position-relative chat-user-image">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                  <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                               </div>
                                               <div className="chat-msg">
                                                  <p className="msg text-muted small shadow px-3 py-2 rounded mb-1">Sure please check below link to find more useful information 
                                                  </p>
                                                  <small className="text-muted msg-time">
                                                     <IoTimeOutline className="me-1" />
                                                     25 min ago
                                                  </small>
                                               </div>
                                            </div>
                                         </div>
                                      </li>
                                      <li>
                                         <div className="d-inline-block">
                                            <div className="d-flex chat-type mb-3">
                                               <div className="position-relative">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                  <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                               </div>
                                               <div className="chat-msg">
                                                  <p className="msg text-muted small shadow px-3 py-2 rounded mb-1">Thank you 😊</p>
                                                  <small className="text-muted msg-time">
                                                     <IoTimeOutline className="me-1" />
                                                     20 min ago
                                                  </small>
                                               </div>
                                            </div>
                                         </div>
                                      </li>
                                      <li className="chat-right">
                                         <div className="d-inline-block">
                                            <div className="d-flex chat-type mb-3">
                                               <div className="position-relative chat-user-image">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" class="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                                  <FaCircle className="text-success text-success on-off align-text-bottom"/>
                                               </div>
                                               <div className="chat-msg">
                                                  <p className="msg text-muted small shadow px-3 py-2 rounded mb-1">Welcome</p>
                                                  <small className="text-muted msg-time">
                                                     <IoTimeOutline className="me-1" />
                                                     18 min ago
                                                  </small>
                                               </div>
                                            </div>
                                         </div>
                                      </li>
                                   </div>
                                </div>
                             </div>
                          </div>
                          <div className="simplebar-placeholder"></div>
                       </div>
                       {/* 
                       <div className="simplebar-track simplebar-horizontal" >
                          <div className="simplebar-scrollbar" ></div>
                       </div>
                       <div className="simplebar-track simplebar-vertical" >
                          <div className="simplebar-scrollbar"></div>
                       </div>
                       */}
                    </ul>
                    <div className="p-2 rounded-bottom shadow">
                       <div className="row g-2">
                          <div className="col">
                             <input type="text" className="form-control border"  placeholder="Enter Message..."/>
                          </div>
                          <div class="col-auto">
                             <a href="#" className="btn btn-icon btn-primary">
                                <IoIosSend className="ti" />
                             </a>
                             <a href="#" class="btn btn-icon btn-primary">
                                <FaRegSmile className="ti" />
                             </a>
                             <a href="#" className="btn btn-icon btn-primary">
                                <FaPaperclip className="ti" />
                             </a>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
     </div>
    )
}

export default Chat;