package edu.ucsb.cs156.happiercows.controllers;

import edu.ucsb.cs156.happiercows.entities.User;
import edu.ucsb.cs156.happiercows.models.CurrentUser;
import edu.ucsb.cs156.happiercows.repositories.UserRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(description="Current User Information")
@RequestMapping("/api/currentUser")
@RestController
public class UserInfoController extends ApiController {
  @Autowired
  private UserRepository userRepository;
 
  @ApiOperation(value = "Get information about current user")
  @PreAuthorize("hasRole('ROLE_USER')")
  @GetMapping("")
  public CurrentUser getCurrentUser() {
    return super.getCurrentUser();
  }

  @ApiOperation(value = "Update user's last online time")
  @PreAuthorize("hasRole('ROLE_USER')")
  @PostMapping("/last-online")
  public ResponseEntity<Instant> updateLastOnline() {
    User user = super.getCurrentUser().getUser();
    Instant timeNow = Instant.now();
    user.setLastOnline(timeNow);
    userRepository.save(user);
    return ResponseEntity.ok().body(timeNow);
  }
}

