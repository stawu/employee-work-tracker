package com.stawu.EWT.server;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TempMainController {

    @GetMapping("/")
    public String index(){
        return "index";
    }
}
