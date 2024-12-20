package com.SeleniumTest;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class Task1 {

	public static void main(String[] args) throws InterruptedException {
		// TODO Auto-generated method stub
		
		WebDriver driver1=new ChromeDriver();
		
		driver1.get("https://www.apple.com/in/store?afid=p238%7Cs8Vs8GkTq-dc_mtid_187079nc38483_pcrid_719882393263_pgrid_112258962467_pntwk_g_pchan__pexid__ptid_kwd-10778630_&cid=aos-IN-kwgo-brand--slid---product-");
		
		System.out.println(driver1.getTitle());
		
		System.out.println(driver1.getCurrentUrl());
	
		System.out.println(driver1.getPageSource());
				
		driver1.manage().window().maximize();
		
		Thread.sleep(3000);
		
		driver1.manage().window().minimize();
		
			
		WebDriver driver2=new EdgeDriver();		
		driver2.get("https://www.samsung.com/in/mobile/?cid=in_pd_ppc_google_im-mobile-smartphone-all-dtc_sales_samsung-book4-all-2024_eshop-pmax-pla_23sep2024-na_1ur-503228l-2024-eshop-bau-performancemax-cpc_pfm--21741953002------x--&gad_source=1&gclid=CjwKCAiA34S7BhAtEiwACZzv4RYCiEUGRQDnWtPiQGrnCuihuIyq70g5wmDVercVkXnWM71XInNZRBoC3K0QAvD_BwE");
	
		System.out.println(driver2.getTitle());
		
		System.out.println(driver2.getCurrentUrl());
		
		System.out.println(driver2.getPageSource());
	
		driver2.manage().window().maximize();
		
		Thread.sleep(3000);
		
		driver2.manage().window().minimize();
		
		
		WebDriver driver3=new FirefoxDriver();
		
		driver3.get("https://www.vivo.com/in");		
		
		System.out.println(driver3.getTitle());	
		
		System.out.println(driver3.getCurrentUrl());
		
    	System.out.println(driver3.getPageSource());
		
		driver3.manage().window().maximize();
		
		Thread.sleep(3000);
		
		driver3.manage().window().minimize();

	}

}
