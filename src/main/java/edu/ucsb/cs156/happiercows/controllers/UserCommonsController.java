package edu.ucsb.cs156.happiercows.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.ucsb.cs156.happiercows.repositories.UserCommonsRepository;
import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;
import edu.ucsb.cs156.happiercows.entities.User;
import edu.ucsb.cs156.happiercows.entities.UserCommons;
import edu.ucsb.cs156.happiercows.entities.Commons;
import edu.ucsb.cs156.happiercows.errors.EntityNotFoundException;
import edu.ucsb.cs156.happiercows.errors.NoCowsException;
import edu.ucsb.cs156.happiercows.errors.NotEnoughMoneyException;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import org.springframework.http.ResponseEntity;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Api(description = "User Commons")
@RequestMapping("/api/usercommons")
@RestController
public class UserCommonsController extends ApiController {

  @Autowired
  private UserCommonsRepository userCommonsRepository;

  @Autowired
  private CommonsRepository commonsRepository;

  @Autowired
  ObjectMapper mapper;

  @ApiOperation(value = "Get a specific user commons (admin only)")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping("")
  public UserCommons getUserCommonsById(
      @ApiParam("userId") @RequestParam Long userId,
      @ApiParam("commonsId") @RequestParam Long commonsId) throws JsonProcessingException {

    UserCommons userCommons = userCommonsRepository.findByCommonsIdAndUserId(commonsId, userId)
        .orElseThrow(
            () -> new EntityNotFoundException(UserCommons.class, "commonsId", commonsId, "userId", userId));
    return userCommons;
  }

  @ApiOperation(value = "Get a user commons for current user")
  @PreAuthorize("hasRole('ROLE_USER')")
  @GetMapping("/forcurrentuser")
  public UserCommons getUserCommonsById(
      @ApiParam("commonsId") @RequestParam Long commonsId) throws JsonProcessingException {

    User u = getCurrentUser().getUser();
    Long userId = u.getId();
    UserCommons userCommons = userCommonsRepository.findByCommonsIdAndUserId(commonsId, userId)
        .orElseThrow(
            () -> new EntityNotFoundException(UserCommons.class, "commonsId", commonsId, "userId", userId));
    return userCommons;
  }

  @ApiOperation(value = "Buy cow(s), totalWealth updated")
  @PreAuthorize("hasRole('ROLE_USER')")
  @PutMapping("/buy")
  public ResponseEntity<String> putUserCommonsByIdBuy(
          @ApiParam("commonsId") @RequestParam Long commonsId, 
          @ApiParam("numOfCowsToBuy") @RequestParam int numOfCowsToBuy)
           throws NotEnoughMoneyException, JsonProcessingException{
        User u = getCurrentUser().getUser();
        Long userId = u.getId();
          if (numOfCowsToBuy < 1) {
          throw new IllegalArgumentException("Number of cows to buy should be greater than or equal to 1");
}
        Commons commons = commonsRepository.findById(commonsId).orElseThrow( 
          ()->new EntityNotFoundException(Commons.class, commonsId));
        UserCommons userCommons = userCommonsRepository.findByCommonsIdAndUserId(commonsId, userId)
        .orElseThrow(
            () -> new EntityNotFoundException(UserCommons.class, "commonsId", commonsId, "userId", userId));
          
        if(userCommons.getTotalWealth() >= commons.getCowPrice()*numOfCowsToBuy ){
          userCommons.setTotalWealth(userCommons.getTotalWealth() - commons.getCowPrice()*numOfCowsToBuy);
          userCommons.setNumOfCows(userCommons.getNumOfCows() +(numOfCowsToBuy));
          userCommons.setLifetimeCowsBought(userCommons.getLifetimeCowsBought() + (numOfCowsToBuy));
        }
        else{
        throw new NotEnoughMoneyException("You need more money!");        }
        userCommonsRepository.save(userCommons);

        String body = mapper.writeValueAsString(userCommons);
        return ResponseEntity.ok().body(body);
    }

  @ApiOperation(value = "Sell a cow, totalWealth updated")
  @PreAuthorize("hasRole('ROLE_USER')")
  @PutMapping("/sell")
  public ResponseEntity<String> putUserCommonsByIdSell(
          @ApiParam("commonsId") @RequestParam Long commonsId) throws NoCowsException, JsonProcessingException {
        User u = getCurrentUser().getUser();
        Long userId = u.getId();

        Commons commons = commonsRepository.findById(commonsId).orElseThrow( 
          ()->new EntityNotFoundException(Commons.class, commonsId));
        UserCommons userCommons = userCommonsRepository.findByCommonsIdAndUserId(commonsId, userId)
        .orElseThrow(
            () -> new EntityNotFoundException(UserCommons.class, "commonsId", commonsId, "userId", userId));


        if(userCommons.getNumOfCows() >= 1 ){
          userCommons.setTotalWealth(userCommons.getTotalWealth() + commons.getCowPrice());
          userCommons.setNumOfCows(userCommons.getNumOfCows() - 1);
          userCommons.setLifetimeCowsSold(userCommons.getLifetimeCowsSold() + 1);
        }
        else{
          throw new NoCowsException("You have no cows to sell!");
        }
        userCommonsRepository.save(userCommons);

        String body = mapper.writeValueAsString(userCommons);
        return ResponseEntity.ok().body(body);
    }

    @ApiOperation(value = "Get all user commons for a specific commons")
    @GetMapping("/commons/all")
    public  ResponseEntity<String> getUsersCommonsByCommonsId(
        @ApiParam("commonsId") @RequestParam Long commonsId) throws JsonProcessingException {
      Iterable<UserCommons> uc = userCommonsRepository.findByCommonsId(commonsId);
      
   
    String body = mapper.writeValueAsString(uc);
    return ResponseEntity.ok().body(body);
  }

}