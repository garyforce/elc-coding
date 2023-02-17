/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import React from "react";
import ItemsResult from "./Items/ItemsResult";
import { debounce } from "lodash";

const baseURL = "http://localhost:3035";

class Menu extends React.Component {
  /**
   * Main constructor for the Menu Class
   * @memberof Menu
   */
  constructor() {
    super();
    this.state = {
      showingSearch: false,
    };
  }
  componentDidMount() {
    this.fetchItems("");
  }
  fetchItems(value) {
    this.setState({ loading: true });
    console.log("asdf", value);
    fetch(`${baseURL}?filter=${value}`)
      .then((resp) => resp.json())
      .then((resp) => {
        this.setState({ items: resp, loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  }

  /**
   * Shows or hides the search container
   * @memberof Menu
   * @param e [Object] - the event from a click handler
   */
  showSearchContainer(e) {
    e.preventDefault();
    this.setState({
      showingSearch: !this.state.showingSearch,
    });
  }

  /**
   * Calls upon search change
   * @memberof Menu
   * @param e [Object] - the event from a text change handler
   */
  onSearch(e) {
    // Start Here
    // ...
    // e.persist();
    const {
      target: { value },
    } = e;
    this.debouncedFn = debounce(() => {
      this.setState({ items: null });
      this.fetchItems(value);
    }, 300);

    this.debouncedFn();
  }

  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof App
   */
  render() {
    const { showingSearch, items, loading } = this.state;
    return (
      <header className="menu">
        <div className="menu-container">
          <div className="menu-holder">
            <h1>ELC</h1>
            <nav>
              <a href="#" className="nav-item">
                HOLIDAY
              </a>
              <a href="#" className="nav-item">
                WHAT'S NEW
              </a>
              <a href="#" className="nav-item">
                PRODUCTS
              </a>
              <a href="#" className="nav-item">
                BESTSELLERS
              </a>
              <a href="#" className="nav-item">
                GOODBYES
              </a>
              <a href="#" className="nav-item">
                STORES
              </a>
              <a href="#" className="nav-item">
                INSPIRATION
              </a>

              <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                <i className="material-icons search">search</i>
              </a>
            </nav>
          </div>
        </div>
        <div className={(showingSearch ? "showing " : "") + "search-container"}>
          <input type="text" onChange={(e) => this.onSearch(e)} />
          <a href="#" onClick={(e) => this.showSearchContainer(e)}>
            <i className="material-icons close">close</i>
          </a>
          {loading && "Loading..."}
          {showingSearch && items && <ItemsResult items={items} />}
        </div>
      </header>
    );
  }
}

// Export out the React Component
export default Menu;
