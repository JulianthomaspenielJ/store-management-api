
import './App.css';
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import Alert from './Components/Alert';
import Carosol from './Components/Carosol';
import Accordion from './Components/Accordion';
import Badges from './Components/Badges';
import Breadcrumps from './Components/Breadcrumps';
import Buttons from './Components/Buttons';
import Cards from './Components/Cards';
import Profile from './Components/Profile';
import Faq from './Components/Faq';
import Contact from './Components/Contact';
import Register from './Components/Register';
import Login from './Components/Login';
import Blank from './Components/Blank';
import Error from './Components/Error';
import Genral from './Components/Genral';
import Data from './Components/Data';
import Bootstrap from './Components/Bootstrap';
import Remix from './Components/Remix';
import Boxions from './Components/Boxions';
import Formeditor from './Components/Forms/Formeditor';
import Formelement from './Components/Forms/Formelement';
import Formlayouts from './Components/Forms/Formlayouts';
import Formvalidation from './Components/Forms/Formvalidation';
import Listgroup from './Components/Listgroup';
import Model from './Components/Model';
import Tabs from './Components/Tabs';
import Pagination from './Components/Pagination';
import Progress from './Components/Progress';
import Spinners from './Components/Spinners';
import Tooltip from './Components/Tooltip';
// import Charts from './Components/Charts';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/Dashboard' element={<Dashboard/>} />
          <Route path='/Alert' element={<Alert/>} />
          <Route path='/Accordion' element={<Accordion/>} />
          <Route path='/Badges' element={<Badges/>} />
          <Route path='/Breadcrumps' element={<Breadcrumps/>} />
          <Route path='/Buttons' element={<Buttons/>} />
          <Route path='/Cards' element={<Cards/>} />
          <Route path='/Carosol' element={<Carosol/>} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/Faq' element={<Faq />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Error' element={<Error />} />
          <Route path='/Blank' element={<Blank />} />
          <Route path='/Genral' element={<Genral />} />
          <Route path='/Data' element={<Data/>} />
          {/* <Route path='/Charts' element={<Charts/>} /> */}
          <Route path='/Bootstrap' element={<Bootstrap/>} />
          <Route path='/Remix' element={<Remix/>} />
          <Route path='/Boxions' element={<Boxions/>} />
          <Route path='/Formeditor' element={<Formeditor/>} />
          <Route path='/Formelement' element={<Formelement/>} />
          <Route path='/Formlayouts' element={<Formlayouts/>} />
          <Route path='/Formvalidation' element={<Formvalidation/>} />
          <Route path='/Listgroup' element={<Listgroup/>} />
          <Route path='/Model' element={<Model/>} />
          <Route path='/Tabs' element={<Tabs/>} />
          <Route path='/Pagination' element={<Pagination/>} />
          <Route path='/Progress' element={<Progress/>} />
          <Route path='/Spinners' element={<Spinners/>} />
          <Route path='/Tooltip' element={<Tooltip/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
