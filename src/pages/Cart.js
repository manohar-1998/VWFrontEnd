import React,{useState} from 'react';
import { List, Drawer } from '@material-ui/core';
const Cart = () =>{
    const [open1, setOpen1] = useState(false);
    const list = (anchor) => (
        <div style={{ width: 350 }} onClick={() => setOpen1(false)}>
            return (
              <List style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                <ul class="MuiList-root MuiList-padding" >
                  <div style={{ margin: '0px 20px 0px 20px', border: '1px solid gray', }}>
                    Hello Cart
                  </div>
                </ul>
              </List>
            )
          )
        </div>
      );
    return(
        <div>
            <Drawer open={open1} anchor={"right"} onClose={() => setOpen1(false)}>
                    {list()}
                  </Drawer>
        </div>
    )
}
export default Cart;