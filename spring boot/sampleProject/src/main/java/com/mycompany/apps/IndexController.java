package com.mycompany.apps;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexController {

    @RequestMapping(value = {"/"}, method = RequestMethod.GET)
    public String onGetIndexPage(Model m) {
        return "index";
    }

    @RequestMapping(value = {"/home.htm"}, method = RequestMethod.GET)
    public String onGetHomePage(Model m) {
        return "home";
    }
}
