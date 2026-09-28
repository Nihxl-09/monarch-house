import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Coffee,
  Compass,
  Menu,
  Sparkles,
  Star,
  Utensils,
  Waves,
  X,
} from "lucide-react";

const rooms = [
  {
    id: 1,
    name: "Garden Suite",
    category: "Suite",
    price: 24000,
    size: "58 m²",
    guests: "2 guests",
    image:
      "https://www.myboutiquehotel.com/photos/113614/hotel-richer-de-belleval-montpellier-001-24486-900x570.jpg",
    description:
      "A quiet suite layered with natural textures, soft linen and warm evening light. Designed for slow mornings and unhurried nights.",
    features: ["King bed", "Garden view", "Rain shower", "Breakfast included"],
  },
  {
    id: 2,
    name: "Terrace Room",
    category: "Room",
    price: 18000,
    size: "42 m²",
    guests: "2 guests",
    image:
      "https://static.prod.r53.tablethotels.com/media/property/9002/room/59745/01.jpg",
    description:
      "An intimate room with a private terrace, generous proportions and a calm palette inspired by stone, sand and timber.",
    features: ["King bed", "Private terrace", "Rain shower", "Mini bar"],
  },
  {
    id: 3,
    name: "The Monarch Suite",
    category: "Signature Suite",
    price: 35000,
    size: "86 m²",
    guests: "3 guests",
    image:
      "https://www.yonder.fr/sites/default/files/contenu/hotels/04%20-%20021_Mallorca-web-1-DeluxeRoom.jpg",
    description:
      "Our signature stay. A spacious private retreat with a separate lounge, deep soaking bath and a terrace made for long evenings.",
    features: [
      "King bed",
      "Separate lounge",
      "Soaking bath",
      "Private terrace",
    ],
  },
];

const experiences = [
  {
    number: "01",
    title: "Morning Ritual",
    text: "Begin slowly with locally roasted coffee, seasonal fruit and breakfast served wherever you choose.",
    icon: Coffee,
  },
  {
    number: "02",
    title: "The Water",
    text: "Spend an afternoon beside the pool, followed by a quiet hour in our treatment room.",
    icon: Waves,
  },
  {
    number: "03",
    title: "Local Table",
    text: "Our kitchen follows the seasons, working with nearby producers to keep every plate simple and expressive.",
    icon: Utensils,
  },
];

const experienceDetails = {
  "Morning Ritual": {
    eyebrow: "MORNING RITUAL",
    title: "Begin slowly.",
    text: "Mornings at Monarch House are designed to be unhurried. Start with freshly brewed coffee, seasonal fruit and a quiet breakfast while the coast wakes around you.",
    details: [
      "Freshly brewed coffee and tea",
      "Seasonal breakfast",
      "Locally sourced ingredients",
      "Available every morning",
    ],
  },
  "The Water": {
    eyebrow: "THE WATER",
    title: "Let the day drift.",
    text: "From a quiet swim to a slow afternoon by the water, Monarch House makes space for days without a schedule.",
    details: [
      "Private pool",
      "Coastal walks",
      "Morning swims",
      "Relaxed poolside service",
    ],
  },
  "Local Table": {
    eyebrow: "LOCAL TABLE",
    title: "Taste the coast.",
    text: "Our kitchen celebrates the ingredients and traditions of India's west coast, bringing together local produce, familiar flavours and modern presentation.",
    details: [
      "Seasonal local ingredients",
      "West Coast inspired dishes",
      "Daily changing selections",
      "Vegetarian options available",
    ],
  },
  "View Dining": {
    eyebrow: "DINING",
    title: "The Monarch Table.",
    text: "A relaxed dining room built around fresh ingredients, thoughtful cooking and the flavours of the coast.",
    details: [
      "Breakfast · 7:00 AM – 10:30 AM",
      "Lunch · 12:30 PM – 3:00 PM",
      "Dinner · 7:00 PM – 10:30 PM",
      "Reservations recommended",
    ],
  },
};

const gallery = [
  {
    image:
      "https://www.myboutiquehotel.com/photos/110934/maison-albar-le-monumental-palace-porto-041-41722-1110x700.jpg",
    title: "The arrival",
  },
  {
    image:
      "https://www.yonder.fr/sites/default/files/contenu/hotels/04%20-%20021_Mallorca-web-1-DeluxeRoom.jpg",
    title: "A quiet room",
  },
  {
    image:
      "https://images.ctfassets.net/9cxgygtadmvl/2C0zUY3gnMghAgrt4Qsa0r/bb84a6b07ed5026b377da1cb5c1290b5/pool-Regent_Porto-trip-report.jpg",
    title: "The pool",
  },
  {
    image:
      "https://traveltime.media/wp-content/uploads/2021/04/wawelberg-hotel-lobby.jpg",
    title: "The lounge",
  },
];

function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [toast, setToast] = useState("");
  const [activeGallery, setActiveGallery] = useState(0);

  const [booking, setBooking] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      bookingOpen || selectedRoom || selectedExperience ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [bookingOpen, selectedRoom, selectedExperience]);

  useEffect(() => {
    if (!toast) return;

    const timeout = setTimeout(() => {
      setToast("");
    }, 3500);

    return () => clearTimeout(timeout);
  }, [toast]);

  const scrollToSection = (id) => {
    setMobileMenu(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const openBooking = () => {
    setBookingOpen(true);
    setMobileMenu(false);
  };

  const openExperience = (name) => {
    setSelectedExperience(experienceDetails[name]);
  };

  const submitBooking = (event) => {
    event.preventDefault();

    if (!booking.checkIn || !booking.checkOut) {
      setToast("Please select your arrival and departure dates.");
      return;
    }

    if (new Date(booking.checkOut) <= new Date(booking.checkIn)) {
      setToast("Departure must be after arrival.");
      return;
    }

    setBookingOpen(false);
    setToast(
      `Your request for ${booking.guests} guest${
        booking.guests === "1" ? "" : "s"
      } has been received.`
    );
  };

  const changeGallery = (direction) => {
    setActiveGallery((current) => {
      if (direction === "next") {
        return (current + 1) % gallery.length;
      }

      return (current - 1 + gallery.length) % gallery.length;
    });
  };

  return (
    <div className="site">
      <header className="navbar">
        <div className="nav-inner">
          <button
            className="brand"
            onClick={() => scrollToSection("home")}
            aria-label="Go to homepage"
          >
            <span className="brand-mark">M</span>
            <span>
              <strong>MONARCH</strong>
              <small>HOUSE</small>
            </span>
          </button>

          <nav className={`desktop-nav ${mobileMenu ? "mobile-open" : ""}`}>
            <button onClick={() => scrollToSection("rooms")}>Rooms</button>
            <button onClick={() => scrollToSection("experience")}>
              Experience
            </button>
            <button onClick={() => scrollToSection("dining")}>Dining</button>
            <button onClick={() => scrollToSection("gallery")}>Gallery</button>
            <button onClick={() => scrollToSection("contact")}>Contact</button>
          </nav>

          <button className="nav-book" onClick={openBooking}>
            Reserve a stay
            <ArrowRight size={16} />
          </button>

          <button
            className="menu-button"
            onClick={() => setMobileMenu((current) => !current)}
            aria-label="Toggle navigation"
          >
            {mobileMenu ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-image" />

          <div className="hero-overlay" />

          <div className="hero-content">
            <p className="eyebrow light">
              A private coastal retreat
            </p>

            <h1>
              Stay somewhere
              <br />
              <em>worth remembering.</em>
            </h1>

            <p className="hero-copy">
              Monarch House is a quiet boutique hotel created around
              considered spaces, thoughtful hospitality and the simple
              pleasure of having nowhere else to be.
            </p>

            <div className="hero-actions">
              <button className="primary-button light-button" onClick={openBooking}>
                Check availability
                <ArrowRight size={17} />
              </button>

              <button
                className="text-button"
                onClick={() => scrollToSection("story")}
              >
                Discover Monarch
                <ArrowDown size={16} />
              </button>
            </div>
          </div>

          <div className="hero-location">
            <Compass size={15} />
            <span>West Coast · India</span>
          </div>

          <div className="hero-scroll">
            <span>Scroll to explore</span>
            <div className="scroll-line" />
          </div>
        </section>

        <section className="booking-strip">
          <div className="booking-intro">
            <span className="eyebrow">Plan your stay</span>
            <strong>Find your room</strong>
          </div>

          <div className="booking-fields">
            <label>
              <span>Check in</span>
              <div>
                <CalendarDays size={17} />
                <input
                  type="date"
                  value={booking.checkIn}
                  onChange={(event) =>
                    setBooking({
                      ...booking,
                      checkIn: event.target.value,
                    })
                  }
                />
              </div>
            </label>

            <label>
              <span>Check out</span>
              <div>
                <CalendarDays size={17} />
                <input
                  type="date"
                  value={booking.checkOut}
                  onChange={(event) =>
                    setBooking({
                      ...booking,
                      checkOut: event.target.value,
                    })
                  }
                />
              </div>
            </label>

            <label>
              <span>Guests</span>
              <div>
                <select
                  value={booking.guests}
                  onChange={(event) =>
                    setBooking({
                      ...booking,
                      guests: event.target.value,
                    })
                  }
                >
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4 guests</option>
                </select>
                <ChevronDown size={16} />
              </div>
            </label>

            <button className="dark-button" onClick={submitBooking}>
              Search rooms
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        <section id="story" className="story section">
          <div className="story-grid">
            <div className="story-image reveal">
              <img
                src="https://www.myboutiquehotel.com/photos/110934/maison-albar-le-monumental-palace-porto-041-41722-1110x700.jpg"
                alt="Elegant hotel lobby"
              />
              <div className="image-caption">The House · 01</div>
            </div>

            <div className="story-copy reveal">
              <p className="eyebrow">The house</p>

              <h2>
                Luxury doesn't have
                <br />
                to announce itself.
              </h2>

              <p>
                Monarch House was imagined as a retreat for people who value
                space, quiet and thoughtful details. There is no grand
                spectacle here. Instead, there are natural materials, soft
                light, beautiful food and rooms designed to feel genuinely
                comfortable.
              </p>

              <p>
                From the first coffee in the morning to the last drink before
                bed, every part of the stay has been considered without
                becoming complicated.
              </p>

              <button
                className="outline-button"
                onClick={() => scrollToSection("experience")}
              >
                Explore the experience
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <section id="rooms" className="rooms section section-muted">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">Stay with us</p>
              <h2>Rooms with room to breathe.</h2>
            </div>

            <p>
              Three carefully considered room categories. Each one designed
              around natural light, quiet materials and uninterrupted comfort.
            </p>
          </div>

          <div className="rooms-grid">
            {rooms.map((room, index) => (
              <article
                className="room-card reveal"
                key={room.id}
                style={{ "--delay": `${index * 100}ms` }}
              >
                <div className="room-image">
                  <img src={room.image} alt={room.name} />
                  <span className="room-category">{room.category}</span>

                  <button
                    className="room-view"
                    onClick={() => setSelectedRoom(room)}
                  >
                    View room
                    <ArrowRight size={15} />
                  </button>
                </div>

                <div className="room-info">
                  <div>
                    <h3>{room.name}</h3>
                    <p>
                      {room.size} · {room.guests}
                    </p>
                  </div>

                  <div className="room-price">
                    <strong>₹{room.price.toLocaleString("en-IN")}</strong>
                    <span>night</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="experience section">
          <div className="experience-heading reveal">
            <p className="eyebrow">The experience</p>
            <h2>
              The art of
              <br />
              doing less.
            </h2>
          </div>

          <div className="experience-list">
            {experiences.map((experience) => {
              const Icon = experience.icon;

              return (
                <article className="experience-item reveal" key={experience.number}>
                  <span className="experience-number">
                    {experience.number}
                  </span>

                  <Icon size={24} strokeWidth={1.4} />

                  <div>
                    <h3>{experience.title}</h3>
                    <p>{experience.text}</p>
                  </div>

                  <button
                    className="experience-link"
                    onClick={() => openExperience(experience.title)}
                    type="button"
                  >
                    Discover
                    <ArrowRight size={18} />
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section id="dining" className="dining section">
          <div className="dining-image reveal">
            <img
              src="https://www.yonder.fr/sites/default/files/contenu/hotels/04%20-%20021_Mallorca-web-1-DeluxeRoom.jpg"
              alt="Warm hotel dining and living interior"
            />
          </div>

          <div className="dining-copy reveal">
            <p className="eyebrow">The dining room</p>

            <h2>
              Simple food.
              <br />
              Serious ingredients.
            </h2>

            <p>
              Our kitchen follows the rhythm of the coast. Breakfast is slow,
              lunch is relaxed and dinner becomes the centre of the evening.
              Local produce is treated simply, with enough room for its
              character to come through.
            </p>

            <div className="dining-details">
              <div>
                <span>Breakfast</span>
                <strong>07:00 — 11:00</strong>
              </div>

              <div>
                <span>Dinner</span>
                <strong>18:30 — 22:30</strong>
              </div>
            </div>

            <button
              className="text-link"
              onClick={() => openExperience("View Dining")}
              type="button"
            >
              View dining
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        <section id="gallery" className="gallery section section-muted">
          <div className="gallery-heading reveal">
            <div>
              <p className="eyebrow">A glimpse inside</p>
              <h2>The details matter.</h2>
            </div>

            <div className="gallery-controls">
              <button onClick={() => changeGallery("previous")}>
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => changeGallery("next")}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="gallery-main reveal">
            <img
              src={gallery[activeGallery].image}
              alt={gallery[activeGallery].title}
            />

            <div className="gallery-label">
              <span>0{activeGallery + 1}</span>
              <strong>{gallery[activeGallery].title}</strong>
            </div>
          </div>

          <div className="gallery-thumbnails">
            {gallery.map((item, index) => (
              <button
                key={item.title}
                className={index === activeGallery ? "active" : ""}
                onClick={() => setActiveGallery(index)}
              >
                <img src={item.image} alt="" />
              </button>
            ))}
          </div>
        </section>

        <section className="quote-section">
          <div className="quote-inner reveal">
            <Sparkles size={22} strokeWidth={1.3} />

            <blockquote>
              “A beautiful reminder that the best luxury is often simply
              having the space to slow down.”
            </blockquote>

            <div className="stars">
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
              <Star size={15} fill="currentColor" />
            </div>

            <span>— Guest, September 2026</span>
          </div>
        </section>

        <section id="contact" className="contact section">
          <div className="contact-card reveal">
            <div>
              <p className="eyebrow">Plan your escape</p>
              <h2>Your room is waiting.</h2>
              <p>
                Tell us when you'd like to arrive. We'll take care of the rest.
              </p>
            </div>

            <button className="primary-button" onClick={openBooking}>
              Make a reservation
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="contact-details reveal">
            <div>
              <span>Find us</span>
              <strong>
                Monarch House
                <br />
                West Coast, India
              </strong>
            </div>

            <div>
              <span>Contact</span>
              <strong>
                stay@monarchhouse.com
                <br />
                +91 00000 00000
              </strong>
            </div>

            <div>
              <span>Reception</span>
              <strong>
                Open every day
                <br />
                07:00 — 23:00
              </strong>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-mark">M</span>
          <div>
            <strong>MONARCH HOUSE</strong>
            <span>A quiet place to stay.</span>
          </div>
        </div>

        <div className="footer-links">
          <button onClick={() => scrollToSection("rooms")}>Rooms</button>
          <button onClick={() => scrollToSection("experience")}>
            Experience
          </button>
          <button onClick={() => scrollToSection("gallery")}>Gallery</button>
          <button onClick={() => scrollToSection("contact")}>Contact</button>
        </div>

        <span className="copyright">
          © 2026 Monarch House
        </span>
      </footer>

      {bookingOpen && (
        <div className="modal-backdrop" onMouseDown={() => setBookingOpen(false)}>
          <div
            className="booking-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setBookingOpen(false)}
              aria-label="Close booking"
            >
              <X size={20} />
            </button>

            <p className="eyebrow">Reservations</p>
            <h2>Plan your stay.</h2>
            <p className="modal-copy">
              Choose your dates and we'll prepare your stay request.
            </p>

            <form onSubmit={submitBooking}>
              <label>
                <span>Arrival</span>
                <input
                  type="date"
                  value={booking.checkIn}
                  onChange={(event) =>
                    setBooking({
                      ...booking,
                      checkIn: event.target.value,
                    })
                  }
                  required
                />
              </label>

              <label>
                <span>Departure</span>
                <input
                  type="date"
                  value={booking.checkOut}
                  onChange={(event) =>
                    setBooking({
                      ...booking,
                      checkOut: event.target.value,
                    })
                  }
                  required
                />
              </label>

              <label>
                <span>Guests</span>
                <select
                  value={booking.guests}
                  onChange={(event) =>
                    setBooking({
                      ...booking,
                      guests: event.target.value,
                    })
                  }
                >
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4 guests</option>
                </select>
              </label>

              <button className="dark-button modal-submit" type="submit">
                Continue with reservation
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="modal-note">
              <Clock3 size={15} />
              <span>Flexible cancellation up to 48 hours before arrival.</span>
            </div>
          </div>
        </div>
      )}

      {selectedRoom && (
        <div
          className="modal-backdrop"
          onMouseDown={() => setSelectedRoom(null)}
        >
          <div
            className="room-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedRoom(null)}
              aria-label="Close room details"
            >
              <X size={20} />
            </button>

            <div className="room-modal-image">
              <img
                src={selectedRoom.image}
                alt={selectedRoom.name}
              />
            </div>

            <div className="room-modal-content">
              <p className="eyebrow">{selectedRoom.category}</p>

              <div className="room-modal-title">
                <div>
                  <h2>{selectedRoom.name}</h2>
                  <p>
                    {selectedRoom.size} · {selectedRoom.guests}
                  </p>
                </div>

                <div>
                  <strong>₹{selectedRoom.price.toLocaleString("en-IN")}</strong>
                  <span>per night</span>
                </div>
              </div>

              <p className="room-modal-description">
                {selectedRoom.description}
              </p>

              <div className="feature-list">
                {selectedRoom.features.map((feature) => (
                  <span key={feature}>
                    <Check size={15} />
                    {feature}
                  </span>
                ))}
              </div>

              <button
                className="dark-button"
                onClick={() => {
                  setSelectedRoom(null);
                  setBookingOpen(true);
                }}
              >
                Reserve this room
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedExperience && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedExperience(null)}
        >
          <div
            className="modal experience-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-modal-title"
          >
            <button
              className="modal-close"
              onClick={() => setSelectedExperience(null)}
              aria-label="Close"
              type="button"
            >
              <X size={20} />
            </button>

            <div className="modal-content">
              <span className="eyebrow">{selectedExperience.eyebrow}</span>

              <h2 id="experience-modal-title">{selectedExperience.title}</h2>

              <p className="modal-description">{selectedExperience.text}</p>

              <div className="experience-details">
                {selectedExperience.details.map((detail) => (
                  <div className="experience-detail" key={detail}>
                    <Check size={17} />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <button
                className="primary-button"
                onClick={() => {
                  setSelectedExperience(null);
                  if (selectedExperience.eyebrow === "DINING") {
                    scrollToSection("contact");
                  }
                }}
                type="button"
              >
                {selectedExperience.eyebrow === "DINING"
                  ? "Make an enquiry"
                  : "Reserve your stay"}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast">
          <Check size={17} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

export default App;