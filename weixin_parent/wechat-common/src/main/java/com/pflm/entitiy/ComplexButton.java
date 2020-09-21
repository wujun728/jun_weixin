package com.pflm.entitiy;

/**
 * 复杂按钮（父按钮）
 * @author qinxuewu
 * @version 1.00
 * @time 10/11/2018下午 5:20
 */
public class ComplexButton extends Button {
    private Button[] sub_button;

    public Button[] getSub_button() {
        return sub_button;
    }

    public void setSub_button(Button[] sub_button) {
        this.sub_button = sub_button;
    }
}