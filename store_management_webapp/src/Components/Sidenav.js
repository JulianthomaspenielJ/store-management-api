import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Sidenav() {
  return (
    <div>
       {/* <!-- ======= Sidebar ======= --> */}
  <aside id="sidebar" class="sidebar">

    <ul class="sidebar-nav" id="sidebar-nav">

      <li class="nav-item">
      <li class="nav-item">
        <Link to="/Dashboard" class="nav-link " >
          <i class="bi bi-grid"></i>
          <span>Dashboard</span>
        </Link>
      </li>
      </li>
      {/* <!-- End Dashboard Nav --> */}

      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span>Components</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <Link to="/Alert" className='nav-link'>
              <i class="bi bi-circle"></i><span>Alerts</span>
            </Link>
          </li>
          <li>
            <Link to="/Accordion" className='nav-link'>
              <i class="bi bi-circle"></i><span>Accordion</span>
            </Link>
          </li>
          <li>
            <Link to="/Badges" className='nav-link'>
              <i class="bi bi-circle"></i><span>Badges</span>
            </Link>
          </li>
          <li>
            <Link to="/Breadcrumps" className='nav-link'>
              <i class="bi bi-circle"></i><span>Breadcrumbs</span>
            </Link>
          </li>
          <li>
            <Link to="/Buttons" className='nav-link'>
              <i class="bi bi-circle"></i><span>Buttons</span>
            </Link>
          </li>
          <li>
            <Link to="/Cards" className='nav-link'>
              <i class="bi bi-circle"></i><span>Cards</span>
            </Link>
          </li>
          <li>
            <Link to="/Carosol" className='nav-link'>
              <i class="bi bi-circle"></i><span>Carousel</span>
            </Link>
          </li>
          <li>
            <Link to="/Listgroup">
              <i class="bi bi-circle"></i><span>List group</span>
            </Link>
          </li>
          <li>
            <Link to="/Model">
              <i class="bi bi-circle"></i><span>Modal</span>
            </Link>
          </li>
          <li>
            <Link to="/Tabs">
              <i class="bi bi-circle"></i><span>Tabs</span>
            </Link>
          </li>
          <li>
            <Link to="/Pagination">
              <i class="bi bi-circle"></i><span>Pagination</span>
            </Link>
          </li>
          <li>
            <Link to="/Progress">
              <i class="bi bi-circle"></i><span>Progress</span>
            </Link>
          </li>
          <li>
            <Link to="/Spinners">
              <i class="bi bi-circle"></i><span>Spinners</span>
            </Link>
          </li>
          <li>
            <Link to="/Tooltip">
              <i class="bi bi-circle"></i><span>Tooltips</span>
            </Link>
          </li>
        </ul>
      </li>
      {/* <!-- End Components Nav --> */}

      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-journal-text"></i><span>Forms</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <Link to="/Formelement">
              <i class="bi bi-circle"></i><span>Form Elements</span>
            </Link>
          </li>
          <li>
            <Link to="/Formlayouts">
              <i class="bi bi-circle"></i><span>Form Layouts</span>
            </Link>
          </li>
          <li>
            <Link to="/Formeditor">
              <i class="bi bi-circle"></i><span>Form Editors</span>
            </Link>
          </li>
          <li>
            <Link to="/Formvalidation">
              <i class="bi bi-circle"></i><span>Form Validation</span>
            </Link>
          </li>
        </ul>
      </li>
      {/* <!-- End Forms Nav --> */}

      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-layout-text-window-reverse"></i><span>Tables</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="tables-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <Link to="/Genral">
              <i class="bi bi-circle"></i><span>General Tables</span>
            </Link>
          </li>
          <li>
            <Link to="/Data">
              <i class="bi bi-circle"></i><span>Data Tables</span>
            </Link>
          </li>
        </ul>
      </li>
      {/* <!-- End Tables Nav --> */}

      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-bar-chart"></i><span>Charts</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="charts-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <Link to="/Charts">
              <i class="bi bi-circle"></i><span>Chart.js</span>
            </Link>
          </li>
          <li>
            <a href="charts-apexcharts.html">
              <i class="bi bi-circle"></i><span>ApexCharts</span>
            </a>
          </li>
          <li>
            <a href="charts-echarts.html">
              <i class="bi bi-circle"></i><span>ECharts</span>
            </a>
          </li>
        </ul>
      </li>
      {/* <!-- End Charts Nav --> */}

      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-gem"></i><span>Icons</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="icons-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <Link to="/Bootstrap">
              <i class="bi bi-circle"></i><span>Bootstrap Icons</span>
            </Link>
          </li>
          <li>
            <Link to="/Remix">
              <i class="bi bi-circle"></i><span>Remix Icons</span>
            </Link>
          </li>
          <li>
            <Link to="/Boxions">
              <i class="bi bi-circle"></i><span>Boxicons</span>
            </Link>
          </li>
        </ul>
      </li>
      {/* <!-- End Icons Nav --> */}

      <li class="nav-heading">Pages</li>

      <li class="nav-item">
        <Link to="/Profile" class="nav-link collapsed">
          <i class="bi bi-person"></i>
          <span>Profile</span>
        </Link>
      </li>
      {/* <!-- End Profile Page Nav --> */}

      <li class="nav-item">
        <Link to="/Faq" class="nav-link collapsed">
          <i class="bi bi-question-circle"></i>
          <span>F.A.Q</span>
        </Link>
      </li>
      {/* <!-- End F.A.Q Page Nav --> */}

      <li class="nav-item">
        <Link to="/Contact" class="nav-link collapsed">
          <i class="bi bi-envelope"></i>
          <span>Contact</span>
        </Link>
      </li>
      {/* <!-- End Contact Page Nav --> */}

      <li class="nav-item">
        <Link to="/Register" class="nav-link collapsed">
          <i class="bi bi-card-list"></i>
          <span>Register</span>
        </Link>
      </li>
      {/* <!-- End Register Page Nav --> */}

      <li class="nav-item">
        <Link to="/Login" class="nav-link collapsed">
          <i class="bi bi-box-arrow-in-right"></i>
          <span>Login</span>
        </Link>
      </li>
      {/* <!-- End Login Page Nav --> */}

      <li class="nav-item">
        <Link to="/Error" class="nav-link collapsed">
          <i class="bi bi-dash-circle"></i>
          <span>Error 404</span>
        </Link>
      </li>
      {/* <!-- End Error 404 Page Nav --> */}

      <li class="nav-item">
        <Link to="/Blank" class="nav-link collapsed">
          <i class="bi bi-file-earmark"></i>
          <span>Blank</span>
        </Link>
      </li>
      {/* <!-- End Blank Page Nav --> */}

    </ul>

  </aside>
  {/* <!-- End Sidebar--> */}

 

    </div>
  )
}

export default Sidenav
