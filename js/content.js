const initialState = `
    <div class="page-wrapper">
      <div class="page-wrapper__inner container">
        <div class="layout-menu__container">
          <div class="layout-menu">
            <h1 class="layout-menu--offer">Привет! Как ты хочешь нас видеть 🍕?</h1>
            <div class="layout-menu__option layout-menu__option-table">Табличкой</div>
            <div class="layout-menu__option layout-menu__option-list">Списком</div>
          </div>
        </div>
      </div>
    </div>`;

const headerContent = `<header>
      <div class="header__logo-box">
        <img src="resources/img/logo.png" alt="LOGO">
      </div>
      <div class="header__menu--right">
        <div class="header__menu menu">
          <ul>
            <li><a href="#">Доставка и оплата</a></li>
            <li><a href="#">Контакты</a></li>
            <li><a href="#">Жалобы и предложения</a></li>
            <li><a href="#">Личный кабинет</a></li>
          </ul>
        </div>
        <div class="shop-cart"></div>
        <div class="header__offers menu">
          <ul>
            <li>Хиты</li>
            <li>Новинки</li>
            <li>Выбор чемпионов</li>
            <li>Меню отшельника</li>
          </ul>
        </div>
      </div>
    </header>`;

const asideFilterListContent = `
<select name="sorter" id="sorter">
  <option value="name_asc">Название: А -> Я</option>
  <option value="name_desc">Название: Я -> А</option>
  <option value="price_asc">Цена: убывание </option>
  <option value="price_desc">Цена: возрастание </option>
</select>`;

const asideFilterTableContent = `    <aside>
      <div class="aside-container">
        <div class="filter">
          <div class="filter__section filter__ingredients">
            <p class="filter__calories--describe">Ингредиенты:</p>
            <ul>
              <li><label><input type="checkbox" name="ingredients" id="fish">Рыба</label></li>
              <li><label><input type="checkbox" name="ingredients" id="mushrooms">Грибы</label></li>
              <li><label><input type="checkbox" name="ingredients" id="tomatoes">Помидоры</label></li>
              <li><label><input type="checkbox" name="ingredients" id="asparagus">Спаржа</label></li>
              <li><label><input type="checkbox" name="ingredients" id="mozzarella">Моцарелла</label></li>
              <li><label><input type="checkbox" name="ingredients" id="salami">Салями</label></li>
              <li><label><input type="checkbox" name="ingredients" id="chicken">Курица</label></li>
              <li><label><input type="checkbox" name="ingredients" id="goose">Жёпка гуся</label></li>
            </ul>
          </div>
          <div class="filter__section filter__calories">
            <p class="filter__calories--describe">Калорий на 100гр:</p>
            <ul>
              <li><label><input type="checkbox" name="calories" id="calorie50"><500</label></li>
              <li><label><input type="checkbox" name="calories" id="calories50_100">500-1000</label></li>
              <li><label><input type="checkbox" name="calories" id="calories100"><1000</label></li>
            </ul>
          </div>
          <div class="remove-filters">Сбросить всё</div>
        </div>
      </div>
    </aside>`;

const footerContent = `    <footer>
      <div class="footer__inner">
        <div class="footer__phone footer__row">8 800 555 35 35</div>
        <div class="footer__callback footer__row">Callback</div>
        <div class="footer__social social footer__row">
          <ul>
            <li><a href="#">FB</a></li>
            <li><a href="#">Inst</a></li>
            <li><a href="#">Teleg</a></li>
          </ul>
        </div>
        <div class="footer__menu menu footer__row">
          <ul>
            <li><a href="#">Доставка и оплата</a></li>
            <li><a href="#">Контакты</a></li>
            <li><a href="#">Жалобы и предложения</a></li>
            <li><a href="#">Личный кабинет</a></li>
          </ul>
        </div>
      </div>
    </footer>`;