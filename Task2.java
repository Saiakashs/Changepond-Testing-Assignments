package com.SeleniumTest;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Task2 {
	
	public static void main(String[] args) throws InterruptedException {
		
		
		WebDriver driver=new ChromeDriver();
		
		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
		
		driver.get("http://quiz-fe.hematitecorp.com/");
		
		driver.findElement(By.id("basic-menu")).click();
		
		driver.findElement(By.xpath("//*[@id=\"basic-menu\"]/div[3]/ul/li[1]")).click();
		
		driver.findElement(By.name("fname")).sendKeys("SaiKutthalingam");
		
		driver.findElement(By.name("lname")).sendKeys("Srinivasan");
		
		driver.findElement(By.name("email")).sendKeys("ssaikutthalingam@gmail.com");
		
		driver.findElement(By.name("contact")).sendKeys("9360335909");
		
		Thread.sleep(2000);
		
		driver.findElement(By.id(":r6:")).sendKeys("S@i63Sk4518");
		
		driver.findElement(By.id(":r7:")).sendKeys("S@i63Sk4518");
		
		driver.findElement(By.xpath("//div[@aria-haspopup=\"listbox\"]")).click();
		
		driver.findElement(By.xpath("//li[@data-value=\"student\"]")).click();
		
		driver.findElement(By.name("branch")).click();
		
		driver.findElement(By.name("gender")).click();
		
		driver.findElement(By.xpath("//button[@type=\"submit\"]")).click();
			
		
	}

	

}
