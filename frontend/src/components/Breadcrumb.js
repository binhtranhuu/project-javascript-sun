const Breadcrumb = {
    render: (props) => `
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                ${props.map(
                    (item, index) => `
                    <li class="breadcrumb-item ${(props.length === index + 1) && 'active'}">
                        <a href="#">${item}</a>
                    </li>
                `
                ).join("")}
            </ol>
        </nav>
    `,
};

export default Breadcrumb;
