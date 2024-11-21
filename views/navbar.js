export function renderNavbar() {

    return  `
        <button name="button" class="categories-buttons" id_platform="4">PC</button>
        <button name="button" class="categories-buttons" id_platform="1">PlayStation</button>
        <button name="button" class="categories-buttons" id_platform="2">Xbox</button>
        <button name="button" class="categories-buttons" id_platform="5">Nintendo</button>
        <div class="gender-buttons">
            <button class="toggleButton categories-buttons">Categories</button>
            <div class="dropdownMenu">
                <button class="dropdown-item" enum-category="2">DLCs</button>
                <button class="dropdown-item" enum-category="5">Mods</button>
                <button class="dropdown-item" enum-category="8">Remakes</button>
                <button class="dropdown-item" enum-category="9">Remaster</button>
            </div>
        </div>
        <div class="gender-buttons">
            <button class="categories-buttons toggleButton">Genres</button>
            <div class="dropdown dropdownMenu">
                <button class="dropdown-item" gender_id="2">Point-and-Click</button>
                <button class="dropdown-item" gender_id="4">Fighting</button>
                <button class="dropdown-item" gender_id="5">Shooter</button>
                <button class="dropdown-item" gender_id="8">Platform</button>
                <button class="dropdown-item" gender_id="9">Puzzle</button>
                <button class="dropdown-item" gender_id="10">Racing</button>
                <button class="dropdown-item" gender_id="12">RPG</button>
                <button class="dropdown-item" gender_id="13">Simulator</button>
            </div>
        </div>
    `;
}