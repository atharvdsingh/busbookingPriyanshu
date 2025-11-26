import { Button } from "../ui/Button";
import { Card, CardContent, CardFooter } from "../ui/Card";
import { Clock, MapPin, Wifi, Coffee, Tv } from "lucide-react";

export default function BusCard({ bus }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 bg-muted/20 p-6 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r">
            <h3 className="font-bold text-lg">{bus.operator}</h3>
            <span className="text-sm text-muted-foreground">{bus.type}</span>
            <div className="flex gap-2 mt-4 text-muted-foreground">
              <Wifi className="h-4 w-4" />
              <Coffee className="h-4 w-4" />
              <Tv className="h-4 w-4" />
            </div>
          </div>
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-semibold">{bus.departureTime}</span>
                  <span className="text-muted-foreground text-sm">from {bus.source}</span>
                </div>
                <div className="h-8 border-l-2 border-dashed border-gray-300 ml-2 my-1"></div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-semibold">{bus.arrivalTime}</span>
                  <span className="text-muted-foreground text-sm">at {bus.destination}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">₹{bus.price}</div>
                <div className="text-sm text-muted-foreground">{bus.seatsAvailable} seats left</div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Duration: {bus.duration}
              </div>
              <Button>Select Seats</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
