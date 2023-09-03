import React from 'react'
import { Groups2, DynamicFeed, Visibility, Category } from '@mui/icons-material';
const HeaderCard = () => {


    const data = [
        {
            title: "Users",
            img: <Groups2 sx={{ height: "50px", width: "50px" }} />,
            value: 10
        },
        {
            title: "Posts",
            img: <DynamicFeed sx={{ height: "50px", width: "50px" }} />,
            value: 50
        },
        {
            title: "Categories",
            img: <Visibility sx={{ height: "50px", width: "50px" }} />,
            value: 20

        },
        {
            title: "Sub-Categories",
            img: <Category sx={{ height: "50px", width: "50px" }} />,
            value: 60
        },
    ]
    return (
        <div class="row ">
            {data.map((item) => (
                <div class="col-sm-6 col-md-3 col-lg-3 mt-3 " key={item.title}>
                    <div class="card" style={{ color: "#511", border: "1px solid #511" }}>
                        <div class="card-body d-flex" style={{ justifyContent: "space-evenly", alignItems: "center" }}>
                            {item.img}
                            <p className='d-grid' style={{
                                fontSize: "1.3rem", lineHeight: "1", fontWeight: "600", gap: "10px"
                            }} >
                                {item.value}
                                <small>{item.title}</small>
                            </p>
                        </div>
                    </div>
                </div>
            ))}




        </div>
    )
}

export default HeaderCard